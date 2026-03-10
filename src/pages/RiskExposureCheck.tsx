import { useState, useRef, useEffect, CSSProperties } from "react";
import emailjs from "@emailjs/browser";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category =
  | "AI Governance"
  | "Human Behavior"
  | "Access & Identity"
  | "Incident Readiness"
  | "Data Exposure"
  | "Leadership Alignment";

type Step = "intro" | "questions" | "email" | "results";

interface Option { label: string; score: number; }
interface Question { id: string; category: Category; question: string; context: string; options: Option[]; }
interface CategoryMeta { color: string; icon: string; description: string; }

// ─── Responsive hook ──────────────────────────────────────────────────────────

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  "AI Governance", "Human Behavior", "Access & Identity",
  "Incident Readiness", "Data Exposure", "Leadership Alignment",
];

const CATEGORY_META: Record<Category, CategoryMeta> = {
  "AI Governance":        { color: "#7EE8FA", icon: "◈", description: "Policies, oversight & AI vendor risk" },
  "Human Behavior":       { color: "#C8A96E", icon: "◎", description: "Culture, reporting & decision-making" },
  "Access & Identity":    { color: "#A78BFA", icon: "⬡", description: "Who has access to what — and how" },
  "Incident Readiness":   { color: "#FB923C", icon: "✦", description: "Response plans, roles & practice" },
  "Data Exposure":        { color: "#F472B6", icon: "◉", description: "Where sensitive data lives & who touches it" },
  "Leadership Alignment": { color: "#34D399", icon: "◐", description: "Whether leadership models the risk culture" },
};

const QUESTIONS: Question[] = [
  {
    id: "ai1", category: "AI Governance",
    question: "Does your organization have a documented policy governing employee use of AI tools?",
    context: "This includes ChatGPT, Copilot, Gemini, and any AI-assisted workflows.",
    options: [
      { label: "No policy exists — employees use AI tools freely", score: 0 },
      { label: "There's informal guidance, but nothing documented", score: 1 },
      { label: "A policy exists but isn't widely known or enforced", score: 2 },
      { label: "Yes — documented, communicated, and actively enforced", score: 3 },
    ],
  },
  {
    id: "ai2", category: "AI Governance",
    question: "How does your organization evaluate the security posture of AI vendors before adoption?",
    context: "Think about the AI tools embedded in your existing software, not just standalone AI platforms.",
    options: [
      { label: "We don't — AI tools are adopted based on utility alone", score: 0 },
      { label: "We rely on vendor reputation and basic due diligence", score: 1 },
      { label: "We review data handling terms before signing contracts", score: 2 },
      { label: "Formal security assessment is required before any AI tool is approved", score: 3 },
    ],
  },
  {
    id: "hb1", category: "Human Behavior",
    question: "When an employee makes a security mistake — clicks a phishing link, sends data to the wrong person — what typically happens?",
    context: "The response to mistakes reveals more about your culture than the mistakes themselves.",
    options: [
      { label: "It's often not reported — people are afraid of consequences", score: 0 },
      { label: "It gets reported to IT but there's no structured follow-up", score: 1 },
      { label: "There's a process, but it varies by team or manager", score: 2 },
      { label: "Clear, consistent, blame-free reporting process that everyone knows", score: 3 },
    ],
  },
  {
    id: "hb2", category: "Human Behavior",
    question: "How would you describe the average employee's relationship with cybersecurity?",
    context: "Not their training completion rate — their actual behavior and mindset day to day.",
    options: [
      { label: "It's IT's problem, not theirs", score: 0 },
      { label: "They know the rules but don't always follow them", score: 1 },
      { label: "They're aware and mostly compliant, but not engaged", score: 2 },
      { label: "They think like risk managers — curious, cautious, and proactive", score: 3 },
    ],
  },
  {
    id: "ac1", category: "Access & Identity",
    question: "How does your organization manage access when an employee leaves?",
    context: "Offboarding is one of the most common sources of unmanaged access risk.",
    options: [
      { label: "Access is revoked eventually — but the timeline is inconsistent", score: 0 },
      { label: "IT handles it, but some systems or apps get missed", score: 1 },
      { label: "We have a checklist, but it's manually executed", score: 2 },
      { label: "Automated, audited, and verified within hours of departure", score: 3 },
    ],
  },
  {
    id: "ac2", category: "Access & Identity",
    question: "How much access do third-party vendors and contractors have to your systems?",
    context: "Supply chain access is consistently one of the top breach vectors.",
    options: [
      { label: "Broad access — it's easier to give more than manage less", score: 0 },
      { label: "Vendor access is granted but not regularly reviewed", score: 1 },
      { label: "Access is scoped but reviews are infrequent", score: 2 },
      { label: "Least-privilege access, reviewed quarterly, and time-limited", score: 3 },
    ],
  },
  {
    id: "ir1", category: "Incident Readiness",
    question: "Does your organization have a documented incident response plan — and does leadership know their role in it?",
    context: "A plan that lives in IT and never surfaces to leadership isn't really a plan.",
    options: [
      { label: "No documented plan exists", score: 0 },
      { label: "A plan exists in IT — leadership hasn't reviewed it", score: 1 },
      { label: "Leadership has seen it, but roles aren't clearly defined", score: 2 },
      { label: "Documented, leadership-reviewed, with clear role ownership", score: 3 },
    ],
  },
  {
    id: "ir2", category: "Incident Readiness",
    question: "When did your organization last simulate a cyber incident or conduct a tabletop exercise?",
    context: "Organizations that practice respond faster and recover better.",
    options: [
      { label: "Never", score: 0 },
      { label: "More than two years ago", score: 1 },
      { label: "Within the past year — IT only, not cross-functional", score: 2 },
      { label: "Within the past year — cross-functional, including leadership", score: 3 },
    ],
  },
  {
    id: "de1", category: "Data Exposure",
    question: "Where is your most sensitive data stored, and who has access to it?",
    context: "This includes customer data, financial records, trade secrets, or anything that would damage the business if leaked.",
    options: [
      { label: "Unclear — data is scattered across various systems", score: 0 },
      { label: "We know where it is, but access controls are loose", score: 1 },
      { label: "Data is mapped and access is controlled, but not always enforced", score: 2 },
      { label: "Fully catalogued, access is role-based and regularly audited", score: 3 },
    ],
  },
  {
    id: "de2", category: "Data Exposure",
    question: "How often does your organization back up critical data, and can you recover from a complete system loss?",
    context: "This is your insurance policy against ransomware, hardware failure, and sabotage.",
    options: [
      { label: "Backups exist but recovery hasn't been tested", score: 0 },
      { label: "Regular backups, but recovery time is unknown", score: 1 },
      { label: "Tested backups with a known recovery timeline", score: 2 },
      { label: "Automated backups, regularly tested, RTO/RPO defined and met", score: 3 },
    ],
  },
  {
    id: "la1", category: "Leadership Alignment",
    question: "How often does your leadership team discuss cybersecurity risk — and is it part of strategic business planning?",
    context: "Risk as a strategic conversation, not just a compliance check.",
    options: [
      { label: "Rarely — security is only discussed when something goes wrong", score: 0 },
      { label: "Quarterly or annually, as a compliance obligation", score: 1 },
      { label: "Regular discussion, but often reactive rather than strategic", score: 2 },
      { label: "Part of regular business strategy; leadership understands their role in risk ownership", score: 3 },
    ],
  },
  {
    id: "la2", category: "Leadership Alignment",
    question: "If a security breach occurred today, would leadership know what to do?",
    context: "Not the technical response — their actual role in decision-making, communication, and recovery.",
    options: [
      { label: "Unclear — we haven't defined leadership's role in an incident", score: 0 },
      { label: "IT has a plan, but leadership's involvement isn't clear", score: 1 },
      { label: "Leadership knows broadly what to expect, but details aren't defined", score: 2 },
      { label: "Clear playbook; each leader knows their exact responsibilities", score: 3 },
    ],
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function RiskExposureCheck() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const handleAnswer = (id: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [id]: score }));
  };

  const currentQuestion = QUESTIONS.find(
    (q) => !answers.hasOwnProperty(q.id)
  );

  const categoryScores = CATEGORIES.reduce(
    (acc, cat) => {
      const categoryQuestions = QUESTIONS.filter((q) => q.category === cat);
      const answered = categoryQuestions.filter((q) =>
        answers.hasOwnProperty(q.id)
      );
      const total = answered.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      acc[cat] = answered.length > 0 ? total / answered.length : 0;
      return acc;
    },
    {} as Record<Category, number>
  );

  const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);
  const maxScore = 3 * CATEGORIES.length;
  const overallPct = Math.round((totalScore / maxScore) * 100);

  const riskLevel =
    overallPct >= 66
      ? { label: "Low Risk", color: "#34D399" }
      : overallPct >= 33
        ? { label: "Moderate Risk", color: "#FB923C" }
        : { label: "Critical Risk", color: "#F472B6" };

  const weakest = CATEGORIES.filter((cat) => categoryScores[cat] < 1);
  const strongest = CATEGORIES.filter((cat) => categoryScores[cat] >= 2.5);

  /**
   * Generates the personalized report via Vercel API
   */
  const generateReport = async () => {
    if (!email.trim()) return;

    setIsLoading(true);
    setReportError(null);

    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          role,
          company,
          scores: answers,
          totalScore,
          maxScore,
          riskLevel: riskLevel.label,
          categories: categoryScores,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.details || "Failed to generate report"
        );
      }

      setStep("results");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setReportError(errorMessage);
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── INTRO ─────────────────────────────────────────────────────────────────

  if (step === "intro") {
    return (
      <Shell>
        <IntroScreen onStart={() => setStep("questions")} isMobile={isMobile} isTablet={isTablet} />
      </Shell>
    );
  }

  // ─── QUESTIONS ─────────────────────────────────────────────────────────────

  if (step === "questions") {
    const progress = ((Object.keys(answers).length + 1) / QUESTIONS.length) * 100;

    return (
      <Shell>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: isMobile ? "32px 16px 80px" : "52px 24px 100px" }}>
          {/* Progress Bar */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <p style={{ color: "#5A5A7A", fontSize: 11, letterSpacing: "0.08em" }}>
                QUESTION {Object.keys(answers).length + 1} OF {QUESTIONS.length}
              </p>
              <p style={{ color: "#5A5A7A", fontSize: 11 }}>{Math.round(progress)}%</p>
            </div>
            <div style={{ height: 3, background: "#12121E", borderRadius: 2, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7EE8FA, #C8A96E, #A78BFA)",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          {currentQuestion && (
            <div style={{ marginBottom: 32 }}>
              {/* Category Badge */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "inline-block", background: CATEGORY_META[currentQuestion.category].color + "15", border: `1px solid ${CATEGORY_META[currentQuestion.category].color}40`, borderRadius: 20, padding: "5px 14px" }}>
                  <p style={{ color: CATEGORY_META[currentQuestion.category].color, fontSize: 10, letterSpacing: "0.06em", fontWeight: 600, margin: 0 }}>
                    {currentQuestion.category.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Question */}
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? 18 : 22, color: "#E8E8F0", fontWeight: 600, lineHeight: 1.4, marginBottom: 12 }}>
                {currentQuestion.question}
              </h2>
              <p style={{ color: "#5A5A7A", fontSize: 13, lineHeight: 1.6, marginBottom: 28 }}>
                {currentQuestion.context}
              </p>

              {/* Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleAnswer(currentQuestion.id, option.score);
                      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
                    }}
                    style={{
                      background: "#0A0A18",
                      border: "1px solid #12121E",
                      borderRadius: 8,
                      padding: "14px 16px",
                      color: "#C8C8E0",
                      fontSize: 13,
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#12121E";
                      e.currentTarget.style.borderColor = CATEGORY_META[currentQuestion.category].color + "40";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#0A0A18";
                      e.currentTarget.style.borderColor = "#12121E";
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {Object.keys(answers).length === QUESTIONS.length && (
            <button
              onClick={() => setStep("email")}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "linear-gradient(90deg, #7EE8FA, #C8A96E)",
                border: "none",
                borderRadius: 8,
                color: "#0A0A18",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              See My Results →
            </button>
          )}
        </div>
      </Shell>
    );
  }

  // ─── EMAIL CAPTURE ─────────────────────────────────────────────────────────

  if (step === "email") {
    const primaryBtn: CSSProperties = {
      background: "linear-gradient(90deg, #7EE8FA, #C8A96E)",
      border: "none",
      borderRadius: 8,
      padding: "12px 24px",
      color: "#0A0A18",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      transition: "all 0.2s",
    };

    const inputStyle: CSSProperties = {
      background: "#0A0A18",
      border: "1px solid #12121E",
      borderRadius: 8,
      padding: "10px 12px",
      color: "#E8E8F0",
      fontSize: 13,
      fontFamily: "inherit",
      transition: "border-color 0.2s",
    };

    return (
      <Shell>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: isMobile ? "32px 16px 80px" : "52px 24px 100px" }}>
          {/* Badge */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ color: "#5A5A7A", fontSize: 10, letterSpacing: "0.15em", marginBottom: 16 }}>
              ALMOST THERE
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? 20 : 26, color: "#E8E8F0", fontWeight: 600, lineHeight: 1.3, marginBottom: 12 }}>
              Get your personalized risk report
            </h2>
            <p style={{ color: "#5A5A7A", fontSize: 13, lineHeight: 1.6 }}>
              We'll analyze your specific results and send a personalized report directly to your inbox.
            </p>
          </div>

          {/* Form */}
          <div style={{ background: "#0A0A18", border: "1px solid #12121E", borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { placeholder: "Your name", value: name, set: setName, type: "text", nm: "name" },
                { placeholder: "Your role (e.g. CISO, CFO, General Counsel)", value: role, set: setRole, type: "text", nm: "role" },
                { placeholder: "Company name", value: company, set: setCompany, type: "text", nm: "company" },
                { placeholder: "Work email address", value: email, set: setEmail, type: "email", nm: "email" },
              ].map((f, i) => (
                <input key={i} type={f.type} name={f.nm} placeholder={f.placeholder} value={f.value}
                  onChange={(e) => f.set(e.target.value)} style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#C8A96E")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#12121E")}
                />
              ))}
            </div>
            <button onClick={generateReport} disabled={!email.trim() || isLoading}
              style={{ ...primaryBtn, width: "100%", marginTop: 16, opacity: email.trim() && !isLoading ? 1 : 0.4, cursor: email.trim() && !isLoading ? "pointer" : "not-allowed" }}>
              {isLoading ? "Generating Your Report..." : "Reveal My Risk Profile →"}
            </button>
            {reportError && (
              <p style={{ color: "#F472B6", fontSize: 12, marginTop: 12, textAlign: "center" }}>
                {reportError}
              </p>
            )}
            <p style={{ color: "#2A2A4A", fontSize: 11, marginTop: 10 }}>No spam. Your data stays with The Cyber Consultant.</p>
          </div>
        </div>
      </Shell>
    );
  }

  // ─── RESULTS ───────────────────────────────────────────────────────────────

  const radarSize = isMobile ? 250 : isTablet ? 270 : 290;

  return (
    <Shell>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "28px 16px 56px" : "44px 24px 80px" }}>
        {/* Badge */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ color: "#5A5A7A", fontSize: 10, letterSpacing: "0.15em", marginBottom: 10 }}>
            {name ? `${name.toUpperCase()}'S` : "YOUR"} HUMAN + AI RISK EXPOSURE CHECK
          </p>
          <div style={{ display: "inline-block", background: riskLevel.color + "15", border: `1px solid ${riskLevel.color}40`, borderRadius: 24, padding: "7px 20px", marginBottom: 8 }}>
            <span style={{ color: riskLevel.color, fontWeight: 700, fontSize: 13, letterSpacing: "0.08em" }}>{riskLevel.label.toUpperCase()}</span>
          </div>
          <p style={{ color: "#5A5A7A", fontSize: 13 }}>
            Overall: <span style={{ color: riskLevel.color, fontWeight: 700 }}>{totalScore}/{maxScore}</span> · {overallPct}%
          </p>
        </div>

        {/* Radar + category cards — stacked on mobile/tablet */}
        <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* Radar card */}
          <div style={{ background: "#0A0A18", border: "1px solid #12121E", borderRadius: 16, padding: isMobile ? "18px 10px" : 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <p style={{ color: "#5A5A7A", fontSize: 9, letterSpacing: "0.12em" }}>YOUR RISK RADAR</p>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", overflow: "hidden" }}>
              <RadarChart scores={categoryScores} animated size={radarSize} />
            </div>
          </div>

          {/* Category cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const score = categoryScores[cat];
              const pct = (score / 3) * 100;
              const isWeak = weakest.includes(cat);
              const isStrong = strongest.includes(cat) && !isWeak;
              return (
                <div key={cat} style={{ background: "#0A0A18", border: `1px solid ${isWeak ? meta.color + "40" : "#12121E"}`, borderRadius: 11, padding: "12px 14px", position: "relative" }}>
                  {(isWeak || isStrong) && (
                    <div style={{ position: "absolute", top: 7, right: 9, background: isWeak ? meta.color + "20" : "#34D39920", borderRadius: 8, padding: "2px 7px" }}>
                      <span style={{ color: isWeak ? meta.color : "#34D399", fontSize: 8, fontWeight: 700, letterSpacing: "0.06em" }}>{isWeak ? "PRIORITY GAP" : "STRONG"}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                    <span style={{ color: meta.color, fontSize: 11 }}>{meta.icon}</span>
                    <span style={{ color: "#C8C8E0", fontSize: 12, fontWeight: 600 }}>{cat}</span>
                  </div>
                  <div style={{ height: 3, background: "#12121E", borderRadius: 2, marginBottom: 5 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: meta.color, borderRadius: 2, transition: "width 1.2s ease" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#3A3A5A", fontSize: 10, paddingRight: 36 }}>{meta.description}</span>
                    <span style={{ color: meta.color, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{score.toFixed(1)}/3</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inbox confirmation card */}
        <div style={{ background: "#0A0A18", border: "1px solid #C8A96E30", borderRadius: 16, padding: isMobile ? "22px 18px" : 28, marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#C8A96E15", border: "1px solid #C8A96E40", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
            ✉️
          </div>
          <div>
            <p style={{ color: "#C8A96E", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 6 }}>
              YOUR PERSONALIZED REPORT IS ON ITS WAY
            </p>
            <p style={{ color: "#7A7A9A", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              A personalized analysis written to your specific results is being sent to <span style={{ color: "#E8E8F0", fontWeight: 600 }}>{email}</span>. Check your inbox — and your spam folder just in case.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg, #0F0A05 0%, #0A0A18 100%)", border: "1px solid #C8A96E25", borderRadius: 16, padding: isMobile ? "22px 16px" : 28, textAlign: "center" }}>
          <p style={{ color: "#C8A96E", fontSize: 9, letterSpacing: "0.18em", marginBottom: 12 }}>READY TO CLOSE YOUR GAPS?</p>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? 20 : 26, color: "#E8E8F0", fontWeight: 600, lineHeight: 1.3, marginBottom: 12 }}>
            Let's talk about what your risk profile means — and what to do about it.
          </h3>
          <p style={{ color: "#5A5A7A", fontSize: 14, lineHeight: 1.65, maxWidth: 440, margin: "0 auto 22px" }}>
            A 30-minute strategy call with Lakeidra gives you a clear picture of where to focus first — specific to your organization, your team, and your risk tolerance.
          </p>
          <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noreferrer"
            style={{ display: "inline-block", background: "linear-gradient(90deg, #7EE8FA, #C8A96E)", border: "none", borderRadius: 8, padding: "12px 24px", color: "#0A0A18", fontWeight: 700, fontSize: 14, cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }}>
            Book a Free Strategy Call →
          </a>
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid #12121E", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#C8A96E15", border: "1px solid #C8A96E30", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#C8A96E", fontSize: 13 }}>◉</span>
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ color: "#C8A96E", fontWeight: 700, fontSize: 13, margin: 0 }}>Lakeidra Smith</p>
              <p style={{ color: "#5A5A7A", fontSize: 12, margin: 0 }}>Strategic Risk Advisor · The Cyber Consultant</p>
            </div>
          </div>
        </div>

        {/* Share */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button onClick={() => { navigator.clipboard.writeText(`I just mapped my Human + AI Risk Exposure — ${riskLevel.label} overall. Free assessment at thecyberconsultant.com/risk-check`); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            style={{ background: "transparent", border: "1px solid #12121E", borderRadius: 6, padding: "8px 18px", color: copied ? "#7EE8FA" : "#3A3A5A", fontSize: 13, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
            {copied ? "✓ Copied to share!" : "Share your results"}
          </button>
        </div>
      </div>
    </Shell>
  );
}

// ─── Shell Component ────────────────────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#0A0A18", color: "#E8E8F0", minHeight: "100vh", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {children}
    </div>
  );
}

// ─── Intro Screen ────────────────────────────────────────────────────────────

function IntroScreen({ onStart, isMobile, isTablet }: { onStart: () => void; isMobile: boolean; isTablet: boolean }) {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: isMobile ? "40px 16px 80px" : "80px 24px 120px", textAlign: "center" }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "inline-block", background: "#C8A96E15", border: "1px solid #C8A96E40", borderRadius: 24, padding: "8px 16px", marginBottom: 24 }}>
          <p style={{ color: "#C8A96E", fontSize: 10, letterSpacing: "0.1em", fontWeight: 600, margin: 0 }}>RISK ASSESSMENT</p>
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? 32 : 48, color: "#E8E8F0", fontWeight: 600, lineHeight: 1.2, marginBottom: 16 }}>
          Map Your Human + AI Risk Exposure
        </h1>
        <p style={{ color: "#7A7A9A", fontSize: 16, lineHeight: 1.65, maxWidth: 500, margin: "0 auto 28px" }}>
          In 5 minutes, understand where your organization is exposed — across AI governance, human behavior, access control, incident readiness, data security, and leadership alignment.
        </p>
      </div>

      <div style={{ background: "#0A0A18", border: "1px solid #12121E", borderRadius: 16, padding: isMobile ? "24px 16px" : 32, marginBottom: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isTablet ? 16 : 20, marginBottom: 24 }}>
          {[
            { icon: "◈", label: "AI Governance", desc: "Policies, oversight & vendor risk" },
            { icon: "◎", label: "Human Behavior", desc: "Culture, reporting & decisions" },
            { icon: "⬡", label: "Access & Identity", desc: "Who has access to what" },
            { icon: "✦", label: "Incident Readiness", desc: "Response plans & practice" },
            { icon: "◉", label: "Data Exposure", desc: "Where sensitive data lives" },
            { icon: "◐", label: "Leadership Alignment", desc: "Risk culture at the top" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "left", padding: "12px 0" }}>
              <p style={{ color: "#5A5A7A", fontSize: 10, letterSpacing: "0.08em", fontWeight: 700, marginBottom: 4 }}>
                {item.icon} {item.label.toUpperCase()}
              </p>
              <p style={{ color: "#3A3A5A", fontSize: 12, lineHeight: 1.5, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onStart} style={{ background: "linear-gradient(90deg, #7EE8FA, #C8A96E)", border: "none", borderRadius: 8, padding: "14px 32px", color: "#0A0A18", fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "all 0.2s", marginBottom: 16 }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
        Start Assessment →
      </button>
      <p style={{ color: "#3A3A5A", fontSize: 12 }}>Takes 5 minutes · No spam</p>
    </div>
  );
}

// ─── Radar Chart Component ────────────────────────────────────────────────────

function RadarChart({ scores, animated, size }: { scores: Record<Category, number>; animated: boolean; size: number }) {
  const categories = Object.keys(scores) as Category[];
  const data = categories.map((cat) => ({ category: cat, score: scores[cat] }));

  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 3;

  const getPoint = (index: number, value: number) => {
    const angle = (index / categories.length) * Math.PI * 2 - Math.PI / 2;
    const r = (value / 3) * maxRadius;
    return { x: centerX + r * Math.cos(angle), y: centerY + r * Math.sin(angle) };
  };

  const points = data.map((d, i) => getPoint(i, d.score)).map((p) => `${p.x},${p.y}`).join(" ");

  const gridLevels = [1, 2, 3];
  const gridPoints = gridLevels.map((level) =>
    Array.from({ length: categories.length }, (_, i) => getPoint(i, level)).map((p) => `${p.x},${p.y}`).join(" ")
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ maxWidth: "100%" }}>
      {/* Grid */}
      {gridPoints.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#12121E" strokeWidth="1" />
      ))}

      {/* Axes */}
      {categories.map((_, i) => {
        const p = getPoint(i, 3);
        return (
          <line key={i} x1={centerX} y1={centerY} x2={p.x} y2={p.y} stroke="#12121E" strokeWidth="1" />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={points}
        fill="url(#radarGradient)"
        fillOpacity={animated ? 0.3 : 0.2}
        stroke="url(#radarGradient)"
        strokeWidth="2"
        style={{ animation: animated ? "radarPulse 1.5s ease-out" : "none" }}
      />

      {/* Labels */}
      {categories.map((cat, i) => {
        const meta = CATEGORY_META[cat];
        const p = getPoint(i, 3.4);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={meta.color}
            fontSize="10"
            fontWeight="500"
            style={{ pointerEvents: "none" }}
          >
            {meta.icon}
          </text>
        );
      })}

      <defs>
        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7EE8FA" stopOpacity="1" />
          <stop offset="100%" stopColor="#C8A96E" stopOpacity="1" />
        </linearGradient>
      </defs>

      <style>{`
        @keyframes radarPulse {
          from { opacity: 0.5; }
          to { opacity: 0.3; }
        }
      `}</style>
    </svg>
  );
}
