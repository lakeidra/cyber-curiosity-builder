import { useState, useRef, CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "Governance" | "Human Risk" | "Strategy" | "Resilience";
type Step = "intro" | "questions" | "email" | "results";

interface Option {
  label: string;
  score: number;
}

interface Question {
  id: string;
  category: Category;
  icon: string;
  question: string;
  options: Option[];
}

interface ScoreTier {
  min: number;
  max: number;
  label: string;
  sublabel: string;
  color: string;
  summary: string;
  priorities: string[];
}

interface CategoryScore {
  score: number;
  max: number;
  pct: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "Governance",
    icon: "⬡",
    question: "How often does your board receive a dedicated cybersecurity briefing?",
    options: [
      { label: "Never or rarely", score: 0 },
      { label: "Once a year", score: 1 },
      { label: "Quarterly", score: 2 },
      { label: "Monthly or as-needed with structured reporting", score: 3 },
    ],
  },
  {
    id: "q2",
    category: "Governance",
    icon: "⬡",
    question: "Does your board have a dedicated cybersecurity committee or designated cyber-literate director?",
    options: [
      { label: "No — cyber is folded into general audit or risk", score: 0 },
      { label: "We've discussed it but haven't formalized anything", score: 1 },
      { label: "One director has a tech background", score: 2 },
      { label: "Yes — a formal committee or designated expert exists", score: 3 },
    ],
  },
  {
    id: "q3",
    category: "Human Risk",
    icon: "◎",
    question: "How would you describe your organization's security culture?",
    options: [
      { label: "Compliance-driven — we do what's required", score: 0 },
      { label: "Awareness-focused — we run annual training", score: 1 },
      { label: "Developing — leadership is engaged but inconsistent", score: 2 },
      { label: "Culture-led — people think like risk managers, not just rule-followers", score: 3 },
    ],
  },
  {
    id: "q4",
    category: "Human Risk",
    icon: "◎",
    question: "When a security incident occurs, what is the board's typical first response?",
    options: [
      { label: "We find out after the fact through a report", score: 0 },
      { label: "Leadership informs the board within days", score: 1 },
      { label: "We have a communication protocol but it's rarely tested", score: 2 },
      { label: "A tested incident response plan notifies the board within hours", score: 3 },
    ],
  },
  {
    id: "q5",
    category: "Strategy",
    icon: "◈",
    question: "How is cybersecurity presented to your board — as a technical issue or a business risk?",
    options: [
      { label: "Primarily technical — the CISO or IT presents metrics", score: 0 },
      { label: "Mix of both, but technical language dominates", score: 1 },
      { label: "Business-aligned, but the connection to strategy isn't always clear", score: 2 },
      { label: "Fully integrated into enterprise risk and business strategy discussions", score: 3 },
    ],
  },
  {
    id: "q6",
    category: "Strategy",
    icon: "◈",
    question: "Does your organization have a documented cyber risk appetite approved at the board level?",
    options: [
      { label: "No formal risk appetite exists", score: 0 },
      { label: "IT or security has one, but the board hasn't reviewed it", score: 1 },
      { label: "The board has seen it but it hasn't been formally approved", score: 2 },
      { label: "Yes — board-approved, reviewed annually, tied to business strategy", score: 3 },
    ],
  },
  {
    id: "q7",
    category: "Resilience",
    icon: "✦",
    question: "Has your organization conducted a board-level tabletop exercise (cyber crisis simulation) in the past 12 months?",
    options: [
      { label: "No — we've never done one", score: 0 },
      { label: "No, but we've discussed scheduling one", score: 1 },
      { label: "Yes, but only at the operational level, not the board", score: 2 },
      { label: "Yes — the board participated and we updated our playbook based on findings", score: 3 },
    ],
  },
  {
    id: "q8",
    category: "Resilience",
    icon: "✦",
    question: "If your organization experienced a significant breach today, how confident are you in the board's ability to lead the response?",
    options: [
      { label: "Not confident — we'd be figuring it out in real-time", score: 0 },
      { label: "Somewhat — we have a plan but the board isn't well-versed in it", score: 1 },
      { label: "Fairly confident — leadership knows their roles", score: 2 },
      { label: "Very confident — we've practiced, and roles are clear at every level", score: 3 },
    ],
  },
];

const CATEGORIES: Category[] = ["Governance", "Human Risk", "Strategy", "Resilience"];

const CAT_COLORS: Record<Category, string> = {
  Governance: "#C8A96E",
  "Human Risk": "#4ECDC4",
  Strategy: "#A78BFA",
  Resilience: "#FB923C",
};

const SCORE_TIERS: ScoreTier[] = [
  {
    min: 0, max: 8,
    label: "Critical Gap",
    sublabel: "Your board is exposed.",
    color: "#FF6B6B",
    summary: "Honestly, this is where most boards are — and it's exactly why breaches keep making headlines. Your organization is operating without the governance structure or cultural foundation to manage cyber as a business risk. The good news? This is fixable, and fixing it starts at the top.",
    priorities: [
      "Establish a basic cyber briefing cadence for the board",
      "Define roles and responsibilities before an incident happens",
      "Shift from compliance mindset to risk management culture",
    ],
  },
  {
    min: 9, max: 15,
    label: "Developing",
    sublabel: "You're aware. Now get aligned.",
    color: "#FCD34D",
    summary: "You've got awareness — that puts you ahead of organizations that haven't started. However, awareness and readiness are not the same thing. Your board understands cyber is important, but the structures, culture, and strategic alignment needed to manage it confidently aren't fully in place yet.",
    priorities: [
      "Formalize your board-level cyber oversight structure",
      "Align cyber risk language with business risk language",
      "Test your incident response plan before you need it",
    ],
  },
  {
    min: 16, max: 20,
    label: "Progressing",
    sublabel: "Strong foundation. Close the gaps.",
    color: "#34D399",
    summary: "Your organization has done real work here, and it shows. Your board is engaged and the fundamentals are in place. Consequently, the remaining gaps — likely in cultural consistency or strategic integration — are exactly the kind of thing that separates organizations that respond well from those that lead through a crisis with confidence.",
    priorities: [
      "Deepen the connection between cyber risk and business strategy",
      "Invest in security culture at every level, not just leadership",
      "Conduct regular tabletop exercises to test and refine readiness",
    ],
  },
  {
    min: 21, max: 24,
    label: "Board-Ready",
    sublabel: "Leading the standard.",
    color: "#C8A96E",
    summary: "You're operating at a level most organizations are still working toward. Your board treats cybersecurity as what it actually is — a strategic business risk — and has built the governance, culture, and resilience to manage it. Therefore, your next focus is staying ahead of emerging threats, not catching up to baseline expectations.",
    priorities: [
      "Stay ahead of emerging risks like AI-driven threats and supply chain exposure",
      "Share your model — your approach can set the standard for your industry",
      "Consider advisory partnerships to continuously pressure-test your posture",
    ],
  },
];

const SYSTEM_PROMPT = `You are Lakeidra Smith, a cybersecurity strategic risk advisor and author of "Cyber Curiosity: A Beginner's Guide to Cybersecurity." You help executives and boards understand cybersecurity as a human and business risk, not a technical one.

Your voice: conversational but authoritative, warm but direct. You lead with facts and anchor in humanity. You never fear-monger — you use facts, not fear. You believe cybersecurity is fundamentally a human problem.

Your phrases: "Honestly...", "However...", "Therefore...", "Consequently...", "Prevention over reaction", "Don't trust, always verify", "I refuse to..."

BANNED: dive into, unleash, game-changing, revolutionary, transformative, leverage, optimize, tapestry, delve, "It's not just x, it's y"

Write a personalized 3-paragraph board cyber readiness assessment for an executive based on their scorecard results. Be specific to their scores by category. Be honest about gaps without being alarmist. End with a clear, warm invitation to have a conversation — not a hard sell. Sign off as Lakeidra Smith, The Cyber Consultant.`;

// ─── Sub-components ───────────────────────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#E8E8F0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,500&display=swap');
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder { color: #3A3A5A !important; }
        input:focus { outline: none !important; }
      `}</style>
      <div style={{ borderBottom: "1px solid #1E1E2E", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#C8A96E", fontWeight: 700, fontSize: 14, letterSpacing: "0.06em" }}>THE CYBER CONSULTANT</span>
        <span style={{ color: "#3A3A5A", fontSize: 12, letterSpacing: "0.1em" }}>BOARD READINESS SCORECARD</span>
      </div>
      <div style={{ animation: "fadeIn 0.4s ease" }}>{children}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "#5A5A7A", fontSize: 11, letterSpacing: "0.15em", fontWeight: 600, marginBottom: 8 }}>
      {children}
    </p>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8, height: 8, borderRadius: "50%", background: "#C8A96E",
            animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <span style={{ color: "#5A5A7A", fontSize: 13 }}>Lakeidra is writing your report...</span>
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const primaryBtn: CSSProperties = {
  background: "#C8A96E",
  color: "#0A0A0F",
  border: "none",
  borderRadius: 8,
  padding: "14px 32px",
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "0.04em",
  cursor: "pointer",
  transition: "all 0.2s ease",
  fontFamily: "inherit",
};

const heroTitle: CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: 42,
  fontWeight: 700,
  color: "#E8E8F0",
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  margin: "8px 0",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BoardReadiness() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [aiReport, setAiReport] = useState<string>("");
  const [loadingReport, setLoadingReport] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = QUESTIONS.length * 3;

  const categoryScores: Record<Category, CategoryScore> = CATEGORIES.reduce(
    (acc, cat) => {
      const qs = QUESTIONS.filter((q) => q.category === cat);
      const score = qs.reduce((s, q) => s + (answers[q.id] ?? 0), 0);
      const max = qs.length * 3;
      acc[cat] = { score, max, pct: Math.round((score / max) * 100) };
      return acc;
    },
    {} as Record<Category, CategoryScore>
  );

  const tier: ScoreTier =
    SCORE_TIERS.find((t) => totalScore >= t.min && totalScore <= t.max) ?? SCORE_TIERS[0];

  const pct = Math.round((totalScore / maxScore) * 100);

  function selectAnswer(qid: string, score: number): void {
    setAnimating(true);
    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [qid]: score }));
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        setStep("email");
      }
      setAnimating(false);
    }, 180);
  }

  async function generateReport(): Promise<void> {
    setStep("results");
    setLoadingReport(true);

    const catSummary = CATEGORIES.map(
      (c) => `${c}: ${categoryScores[c].score}/${categoryScores[c].max} (${categoryScores[c].pct}%)`
    ).join(" | ");

    // ── Submit lead to Formspree ──────────────────────────────────────────────
    try {
      await fetch("https://formspree.io/f/maqpqloy", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          overall_score: `${totalScore}/${maxScore}`,
          tier: tier.label,
          category_breakdown: catSummary,
          _subject: `New Lead: ${name} at ${company} — ${tier.label} (${totalScore}/${maxScore})`,
        }),
      });
    } catch {
      // Silent fail — don't interrupt the user experience
    }

    // ── Generate AI personalized report ──────────────────────────────────────
    const prompt = `Generate a personalized board cyber readiness assessment for ${name || "this executive"} at ${company || "their organization"}.

Their overall score: ${totalScore}/${maxScore} — Tier: "${tier.label}"
Category breakdown: ${catSummary}

Write 3 paragraphs:
1. Acknowledge their specific score honestly and what it signals about where they are
2. Name the 1-2 most critical gaps based on their lowest category scores
3. Warm, direct invitation to have a conversation with you (Lakeidra Smith) about next steps — not salesy, just genuine

Keep it under 250 words. Be specific to their numbers. Don't be generic.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text: string = data.content?.map((b: { type: string; text?: string }) => b.text ?? "").join("") ?? "";
      setAiReport(text);
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch {
      setAiReport("We ran into an issue generating your personalized report. Your scores are still displayed above.");
    } finally {
      setLoadingReport(false);
    }
  }

  function handleShare(): void {
    navigator.clipboard.writeText(
      `I scored ${totalScore}/${maxScore} on the Board Cyber Readiness Scorecard — "${tier.label}". Take the free assessment at thecyberconsultant.com/scorecard`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ─── INTRO ─────────────────────────────────────────────────────────────────

  if (step === "intro") {
    return (
      <Shell>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "60px 24px" }}>
          <Eyebrow>FREE ASSESSMENT · 5 MINUTES</Eyebrow>
          <h1 style={heroTitle}>
            Is Your Board<br />
            <em style={{ color: "#C8A96E", fontStyle: "italic" }}>Cyber Ready?</em>
          </h1>
          <p style={{ color: "#9A9AB8", fontSize: 17, lineHeight: 1.7, margin: "20px auto 36px", maxWidth: 480 }}>
            Most boards think they're prepared. The data says otherwise. Take this 8-question scorecard to find out where your organization actually stands — and what to do about it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 40, textAlign: "left" }}>
            {CATEGORIES.map((cat) => (
              <div key={cat} style={{ background: "#0F0F1A", border: "1px solid #1E1E2E", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: CAT_COLORS[cat], flexShrink: 0 }} />
                <span style={{ color: "#C8C8E0", fontSize: 14 }}>{cat}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setStep("questions")} style={primaryBtn}>
            Start the Assessment →
          </button>
          <p style={{ color: "#5A5A7A", fontSize: 12, marginTop: 16, letterSpacing: "0.05em" }}>
            No fluff. No fear. Just clarity.
          </p>
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #1E1E2E" }}>
            <p style={{ color: "#5A5A7A", fontSize: 12, marginBottom: 8 }}>BROUGHT TO YOU BY</p>
            <p style={{ color: "#C8A96E", fontWeight: 700, fontSize: 15, letterSpacing: "0.05em" }}>LAKEIDRA SMITH</p>
            <p style={{ color: "#7A7A9A", fontSize: 13 }}>Strategic Risk Advisor · The Cyber Consultant</p>
          </div>
        </div>
      </Shell>
    );
  }

  // ─── QUESTIONS ─────────────────────────────────────────────────────────────

  if (step === "questions") {
    const q = QUESTIONS[currentQ];
    const progress = (currentQ / QUESTIONS.length) * 100;

    return (
      <Shell>
        <div style={{ maxWidth: 620, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#5A5A7A", fontSize: 12, letterSpacing: "0.1em" }}>
                QUESTION {currentQ + 1} OF {QUESTIONS.length}
              </span>
              <span style={{ color: CAT_COLORS[q.category], fontSize: 12, fontWeight: 600, letterSpacing: "0.08em" }}>
                {q.category.toUpperCase()}
              </span>
            </div>
            <div style={{ height: 3, background: "#1E1E2E", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: CAT_COLORS[q.category], borderRadius: 2, transition: "width 0.4s ease" }} />
            </div>
          </div>

          <div style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)", transition: "all 0.18s ease" }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: "#E8E8F0", lineHeight: 1.45, marginBottom: 28, fontWeight: 700 }}>
              {q.question}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(q.id, opt.score)}
                  style={{ background: "#0F0F1A", border: "1px solid #1E1E2E", borderRadius: 10, padding: "16px 20px", textAlign: "left", color: "#C8C8E0", fontSize: 15, cursor: "pointer", transition: "all 0.15s ease", lineHeight: 1.5, fontFamily: "inherit" }}
                  onMouseOver={(e) => { const el = e.currentTarget; el.style.borderColor = CAT_COLORS[q.category]; el.style.color = "#E8E8F0"; el.style.background = "#13131F"; }}
                  onMouseOut={(e) => { const el = e.currentTarget; el.style.borderColor = "#1E1E2E"; el.style.color = "#C8C8E0"; el.style.background = "#0F0F1A"; }}
                >
                  <span style={{ color: CAT_COLORS[q.category], fontWeight: 700, marginRight: 10, fontSize: 13 }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {currentQ > 0 && (
            <button
              onClick={() => setCurrentQ((q) => q - 1)}
              style={{ marginTop: 20, background: "transparent", border: "none", color: "#5A5A7A", fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit" }}
            >
              ← Back
            </button>
          )}
        </div>
      </Shell>
    );
  }

  // ─── EMAIL GATE ────────────────────────────────────────────────────────────

  if (step === "email") {
    const inputStyle: CSSProperties = {
      background: "#0F0F1A",
      border: "1px solid #1E1E2E",
      borderRadius: 8,
      padding: "14px 16px",
      color: "#E8E8F0",
      fontSize: 15,
      fontFamily: "inherit",
      outline: "none",
      width: "100%",
    };

    return (
      <Shell>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>◎</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: "#E8E8F0", marginBottom: 12 }}>
            You're one step away from your results.
          </h2>
          <p style={{ color: "#7A7A9A", fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            Enter your details below to receive your personalized Board Cyber Readiness Report — including your score, a category breakdown, and a custom analysis written just for you.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            <input
              type="text"
              name="name"
              placeholder="Your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#C8A96E")}
              onBlur={(e) => (e.target.style.borderColor = "#1E1E2E")}
            />
            <input
              type="text"
              name="company"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#C8A96E")}
              onBlur={(e) => (e.target.style.borderColor = "#1E1E2E")}
            />
            <input
              type="email"
              name="email"
              placeholder="Work email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#C8A96E")}
              onBlur={(e) => (e.target.style.borderColor = "#1E1E2E")}
            />
          </div>
          <button
            onClick={generateReport}
            disabled={!email.trim()}
            style={{ ...primaryBtn, width: "100%", opacity: email.trim() ? 1 : 0.5, cursor: email.trim() ? "pointer" : "not-allowed" }}
          >
            See My Results →
          </button>
          <p style={{ color: "#3A3A5A", fontSize: 12, marginTop: 12 }}>
            No spam. Ever. Your data stays with The Cyber Consultant.
          </p>
        </div>
      </Shell>
    );
  }

  // ─── RESULTS ───────────────────────────────────────────────────────────────

  return (
    <Shell>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Score ring */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Eyebrow>YOUR BOARD READINESS SCORE</Eyebrow>
          <div style={{ position: "relative", display: "inline-block", margin: "24px 0 16px" }}>
            <svg width={160} height={160} viewBox="0 0 160 160">
              <circle cx={80} cy={80} r={68} fill="none" stroke="#1E1E2E" strokeWidth={10} />
              <circle
                cx={80} cy={80} r={68}
                fill="none"
                stroke={tier.color}
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 68}`}
                strokeDashoffset={`${2 * Math.PI * 68 * (1 - pct / 100)}`}
                transform="rotate(-90 80 80)"
                style={{ transition: "stroke-dashoffset 1.2s ease" }}
              />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: tier.color, lineHeight: 1 }}>{totalScore}</div>
              <div style={{ fontSize: 13, color: "#5A5A7A" }}>out of {maxScore}</div>
            </div>
          </div>
          <div style={{ display: "inline-block", background: tier.color + "20", border: `1px solid ${tier.color}40`, borderRadius: 20, padding: "6px 20px", marginBottom: 8 }}>
            <span style={{ color: tier.color, fontWeight: 700, fontSize: 14, letterSpacing: "0.08em" }}>{tier.label.toUpperCase()}</span>
          </div>
          <p style={{ color: "#9A9AB8", fontSize: 16 }}>{tier.sublabel}</p>
        </div>

        {/* Category breakdown */}
        <div style={{ background: "#0F0F1A", border: "1px solid #1E1E2E", borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <p style={{ color: "#5A5A7A", fontSize: 11, letterSpacing: "0.12em", marginBottom: 20 }}>CATEGORY BREAKDOWN</p>
          {CATEGORIES.map((cat) => {
            const { score, max, pct: catPct } = categoryScores[cat];
            return (
              <div key={cat} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "#C8C8E0", fontSize: 14 }}>{cat}</span>
                  <span style={{ color: CAT_COLORS[cat], fontSize: 13, fontWeight: 600 }}>{score}/{max}</span>
                </div>
                <div style={{ height: 6, background: "#1E1E2E", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${catPct}%`, background: CAT_COLORS[cat], borderRadius: 3, transition: "width 1s ease 0.3s" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Priority actions */}
        <div style={{ background: "#0F0F1A", border: "1px solid #1E1E2E", borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <p style={{ color: "#5A5A7A", fontSize: 11, letterSpacing: "0.12em", marginBottom: 16 }}>TOP PRIORITIES FOR YOUR SCORE</p>
          {tier.priorities.map((priority, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: tier.color + "25", border: `1px solid ${tier.color}50`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ color: tier.color, fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
              </div>
              <p style={{ color: "#C8C8E0", fontSize: 14, lineHeight: 1.55, margin: 0 }}>{priority}</p>
            </div>
          ))}
        </div>

        {/* AI report */}
        <div ref={reportRef} style={{ background: "#0F0F1A", border: `1px solid ${tier.color}30`, borderRadius: 14, padding: 28, marginBottom: 24 }}>
          <p style={{ color: "#5A5A7A", fontSize: 11, letterSpacing: "0.12em", marginBottom: 16 }}>YOUR PERSONALIZED ANALYSIS</p>
          {loadingReport ? (
            <TypingDots />
          ) : (
            <p style={{ color: "#C8C8E0", fontSize: 15, lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "'Georgia', serif", margin: 0 }}>
              {aiReport || tier.summary}
            </p>
          )}
        </div>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg, #13100A 0%, #0F0F1A 100%)", border: "1px solid #C8A96E30", borderRadius: 14, padding: 28, textAlign: "center" }}>
          <p style={{ color: "#C8A96E", fontSize: 11, letterSpacing: "0.15em", marginBottom: 12 }}>READY TO CLOSE THE GAPS?</p>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: "#E8E8F0", marginBottom: 12, fontWeight: 700 }}>
            Let's talk about what's next for your board.
          </h3>
          <p style={{ color: "#7A7A9A", fontSize: 14, lineHeight: 1.6, margin: "0 auto 24px", maxWidth: 440 }}>
            A 30-minute strategy call with Lakeidra costs you nothing and gives you a clear picture of where to focus first.
          </p>
          <a
            href="https://calendly.com/podcast-lakeidra/discovery-call"
            target="_blank"
            rel="noreferrer"
            style={{ ...primaryBtn, display: "inline-block", textDecoration: "none" }}
          >
            Book a Free Strategy Call →
          </a>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #1E1E2E", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#C8A96E20", border: "1px solid #C8A96E40", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#C8A96E", fontSize: 16 }}>◉</span>
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ color: "#C8A96E", fontWeight: 700, fontSize: 13, margin: 0 }}>Lakeidra Smith</p>
              <p style={{ color: "#5A5A7A", fontSize: 12, margin: 0 }}>Strategic Risk Advisor · The Cyber Consultant</p>
            </div>
          </div>
        </div>

        {/* Share */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <button
            onClick={handleShare}
            style={{ background: "transparent", border: "1px solid #1E1E2E", borderRadius: 6, padding: "8px 20px", color: copied ? "#4ECDC4" : "#5A5A7A", fontSize: 13, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}
          >
            {copied ? "✓ Copied to share!" : "Share your score"}
          </button>
        </div>

      </div>
    </Shell>
  );
}
