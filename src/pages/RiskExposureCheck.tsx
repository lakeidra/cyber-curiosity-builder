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
    question: "Does your organization know where all sensitive data lives — and who can access it?",
    context: "You can't protect what you can't see.",
    options: [
      { label: "No — data is spread across systems without a clear map", score: 0 },
      { label: "We have a general idea but no formal inventory", score: 1 },
      { label: "A data inventory exists but isn't current", score: 2 },
      { label: "Yes — documented, current, and access-controlled by classification", score: 3 },
    ],
  },
  {
    id: "de2", category: "Data Exposure",
    question: "How does your organization handle sensitive data shared through AI tools?",
    context: "Many organizations are feeding proprietary data into AI tools without realizing the exposure.",
    options: [
      { label: "No controls — employees use AI tools without data guidelines", score: 0 },
      { label: "We've raised it as a concern but haven't acted on it", score: 1 },
      { label: "There are informal guidelines, but no enforcement mechanism", score: 2 },
      { label: "Clear data classification rules govern what can enter AI tools", score: 3 },
    ],
  },
  {
    id: "la1", category: "Leadership Alignment",
    question: "How does your senior leadership talk about cybersecurity internally?",
    context: "Culture is modeled from the top. What leadership says — and doesn't say — sets the tone.",
    options: [
      { label: "Rarely, unless something goes wrong", score: 0 },
      { label: "During annual training or compliance cycles", score: 1 },
      { label: "Occasionally, but it's framed as IT's responsibility", score: 2 },
      { label: "Regularly, framed as a shared business risk owned by everyone", score: 3 },
    ],
  },
  {
    id: "la2", category: "Leadership Alignment",
    question: "Does your organization's security investment reflect its stated risk priorities?",
    context: "Budget decisions reveal true priorities more than strategy documents.",
    options: [
      { label: "Security budget is reactive — it increases after incidents", score: 0 },
      { label: "Budget exists but isn't tied to a risk-based framework", score: 1 },
      { label: "Investments are intentional but not formally tied to risk appetite", score: 2 },
      { label: "Security spend is directly mapped to organizational risk priorities", score: 3 },
    ],
  },
];

const SYSTEM_PROMPT = `You are Lakeidra Smith, a cybersecurity strategic risk advisor and author of "Cyber Curiosity: A Beginner's Guide to Cybersecurity." You help executives, CISOs, HR leaders, and C-suite teams understand cybersecurity as a human and business risk — not a technical one.

Your voice: conversational but authoritative, warm but direct. Lead with facts, anchor in humanity. Never fear-monger. Cybersecurity is fundamentally a human problem.

Your phrases: "Honestly...", "However...", "Therefore...", "Consequently...", "Prevention over reaction", "Don't trust, always verify", "I refuse to..."

BANNED: dive into, unleash, game-changing, revolutionary, transformative, leverage, optimize, tapestry, delve, "It's not just x, it's y"

Write a personalized Human + AI Risk assessment in 3 paragraphs:
1. Read their risk profile honestly — what's strong and what's exposed
2. Name the 2 highest-risk categories and what that means for the business
3. Warm, direct invitation to a conversation — not salesy, just genuine

Sign off as Lakeidra Smith, The Cyber Consultant. Under 280 words. Specific to their numbers.`;

// ─── Radar Chart ──────────────────────────────────────────────────────────────

function RadarChart({ scores, animated = false, size = 280 }: {
  scores: Record<Category, number>;
  animated?: boolean;
  size?: number;
}) {
  const [displayScores, setDisplayScores] = useState<Record<Category, number>>(
    CATEGORIES.reduce((a, c) => ({ ...a, [c]: 0 }), {} as Record<Category, number>)
  );

  useEffect(() => {
    if (!animated) { setDisplayScores(scores); return; }
    const start = performance.now();
    const duration = 1200;
    const from = { ...displayScores };
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const next = CATEGORIES.reduce((a, c) => {
        a[c] = from[c] + (scores[c] - from[c]) * ease;
        return a;
      }, {} as Record<Category, number>);
      setDisplayScores(next);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [scores]);

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.30;
  const labelOffset = size * 0.16;
  const n = CATEGORIES.length;

  function angleFor(i: number) { return (i / n) * 2 * Math.PI - Math.PI / 2; }
  function point(i: number, r: number) {
    const a = angleFor(i);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  const rings = [0.25, 0.5, 0.75, 1];
  const dataPath = CATEGORIES.map((cat, i) => {
    const r = ((displayScores[cat] ?? 0) / 3) * maxR;
    const p = point(i, r);
    return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
  }).join(" ") + " Z";

  const labelFontSize = Math.max(7, Math.min(10, size * 0.033));
  const scoreFontSize = Math.max(6, Math.min(9, size * 0.027));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible", maxWidth: "100%", display: "block" }}>
      {rings.map((ring) => (
        <polygon key={ring}
          points={CATEGORIES.map((_, i) => { const p = point(i, maxR * ring); return `${p.x},${p.y}`; }).join(" ")}
          fill="none" stroke="#1E1E2E" strokeWidth={1}
        />
      ))}
      {CATEGORIES.map((_, i) => {
        const p = point(i, maxR);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#1E1E2E" strokeWidth={1} />;
      })}
      <path d={dataPath} fill="rgba(200,169,110,0.12)" stroke="#C8A96E" strokeWidth={1.5} strokeLinejoin="round" />
      {CATEGORIES.map((cat, i) => {
        const r = ((displayScores[cat] ?? 0) / 3) * maxR;
        const p = point(i, r);
        return <circle key={cat} cx={p.x} cy={p.y} r={3} fill={CATEGORY_META[cat].color} stroke="#0A0A0F" strokeWidth={1.5} />;
      })}
      {CATEGORIES.map((cat, i) => {
        const lp = point(i, maxR + labelOffset);
        const meta = CATEGORY_META[cat];
        const score = Math.round(displayScores[cat] ?? 0);
        const anchor = lp.x < cx - 6 ? "end" : lp.x > cx + 6 ? "start" : "middle";
        const shortLabel = size < 220 ? cat.split(" ")[0].toUpperCase() : cat.toUpperCase();
        return (
          <g key={cat}>
            <text x={lp.x} y={lp.y - 3} textAnchor={anchor}
              fill={meta.color} fontSize={labelFontSize} fontWeight={700}
              fontFamily="'DM Sans', sans-serif" letterSpacing="0.03em">
              {meta.icon} {shortLabel}
            </text>
            <text x={lp.x} y={lp.y + labelFontSize + 2} textAnchor={anchor}
              fill="#5A5A7A" fontSize={scoreFontSize} fontFamily="'DM Sans', sans-serif">
              {score}/3
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#070710", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#E8E8F0", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&display=swap');
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
        input::placeholder { color: #2A2A4A !important; }
        input:focus { outline: none !important; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #1E1E2E; border-radius: 2px; }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60vw", height: "60vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 70%)", animation: "glow 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50vw", height: "50vw", maxWidth: 500, maxHeight: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(126,232,250,0.04) 0%, transparent 70%)", animation: "glow 8s ease-in-out infinite 2s" }} />
      </div>
      <div style={{ position: "relative", zIndex: 10, borderBottom: "1px solid #12121E", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", backdropFilter: "blur(10px)", background: "rgba(7,7,16,0.85)", flexWrap: "wrap", gap: 6 }}>
        <span style={{ color: "#C8A96E", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em" }}>THE CYBER CONSULTANT</span>
        <span style={{ color: "#2A2A4A", fontSize: 10, letterSpacing: "0.1em" }}>HUMAN + AI RISK EXPOSURE CHECK</span>
      </div>
      <div style={{ position: "relative", zIndex: 10, animation: "fadeUp 0.5s ease" }}>{children}</div>
    </div>
  );
}

// ─── EmailJS Config ───────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID  = "service_sath5sc";
const EMAILJS_TEMPLATE_ID = "template_zv89flv";
const EMAILJS_PUBLIC_KEY  = "8sfTPg5hIBawM9a68";

// Initialize once at module level — no race conditions
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

async function sendReportEmail(params: {
  to_email: string;
  name: string;
  risk_level: string;
  report_body: string;
}) {
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
}

const primaryBtn: CSSProperties = {
  background: "#C8A96E", color: "#070710", border: "none", borderRadius: 8,
  padding: "14px 28px", fontSize: 15, fontWeight: 700, letterSpacing: "0.04em",
  cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s ease",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RiskExposureCheck() {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width < 900;

  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const categoryScores: Record<Category, number> = CATEGORIES.reduce((acc, cat) => {
    const qs = QUESTIONS.filter((q) => q.category === cat);
    acc[cat] = qs.length > 0 ? qs.reduce((s, q) => s + (answers[q.id] ?? 0), 0) / qs.length : 0;
    return acc;
  }, {} as Record<Category, number>);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = QUESTIONS.length * 3;
  const overallPct = Math.round((totalScore / maxScore) * 100);
  const weakest = [...CATEGORIES].sort((a, b) => categoryScores[a] - categoryScores[b]).slice(0, 2);
  const strongest = [...CATEGORIES].sort((a, b) => categoryScores[b] - categoryScores[a]).slice(0, 2);
  const riskLevel =
    overallPct >= 75 ? { label: "Low Exposure",      color: "#34D399" } :
    overallPct >= 50 ? { label: "Moderate Exposure", color: "#FCD34D" } :
    overallPct >= 25 ? { label: "High Exposure",     color: "#FB923C" } :
                       { label: "Critical Exposure", color: "#FF6B6B" };

  function selectAnswer(qid: string, score: number) {
    setAnimating(true);
    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [qid]: score }));
      if (currentQ < QUESTIONS.length - 1) setCurrentQ((q) => q + 1);
      else setStep("email");
      setAnimating(false);
    }, 200);
  }

  async function generateReport() {
    setStep("results");
    const catSummary = CATEGORIES.map((c) => `${c}: ${categoryScores[c].toFixed(1)}/3`).join(" | ");

    // 1. Submit lead to Formspree (fire and forget)
    fetch("https://formspree.io/f/maqpqloy", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name, company, role, email,
        tool: "Human + AI Risk Exposure Check",
        overall_score: `${totalScore}/${maxScore} (${overallPct}%)`,
        risk_level: riskLevel.label,
        category_scores: catSummary,
        weakest_areas: weakest.join(", "),
        _subject: `New Lead: ${name} at ${company} — ${riskLevel.label} (${overallPct}%)`,
      }),
    }).catch(() => {});

    // 2. Generate report directly from browser via Anthropic API, then email it
    const prompt = `Generate a personalized Human + AI Risk assessment for ${name || "this leader"} (${role || "executive"}) at ${company || "their organization"}.
Overall score: ${totalScore}/${maxScore} — Risk Level: "${riskLevel.label}"
Category scores (0–3): ${catSummary}
Weakest: ${weakest.join(", ")} | Strongest: ${strongest.join(", ")}
Write 3 paragraphs as described. Be specific. Don't be generic.`;

    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const reportText: string = data.content?.map((b: { type: string; text?: string }) => b.text ?? "").join("") ?? "";

      // 3. Send report to prospect via EmailJS
      if (reportText && email) {
        await sendReportEmail({
          to_email: email,
          name: name || "there",
          risk_level: riskLevel.label,
          report_body: reportText,
        });
      }
    } catch (err) {
      console.error("EmailJS error:", err);
    }
  }

  const inputStyle: CSSProperties = {
    background: "#0A0A18", border: "1px solid #12121E", borderRadius: 8,
    padding: "13px 16px", color: "#E8E8F0", fontSize: 14,
    fontFamily: "inherit", width: "100%",
  };

  // ─── INTRO ─────────────────────────────────────────────────────────────────

  if (step === "intro") {
    const radarSize = isMobile ? 230 : isTablet ? 260 : 300;
    return (
      <Shell>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "36px 20px 48px" : "64px 24px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0F0F1E", border: "1px solid #1E1E2E", borderRadius: 20, padding: "6px 14px", marginBottom: 22 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7EE8FA", boxShadow: "0 0 8px #7EE8FA", flexShrink: 0 }} />
            <span style={{ color: "#7EE8FA", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em" }}>FREE ASSESSMENT · 8 MINUTES</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? 32 : isTablet ? 42 : 52, fontWeight: 700, color: "#E8E8F0", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 18 }}>
            Where Is Your Organization<br />
            <em style={{ color: "#C8A96E", fontStyle: "italic" }}>Actually Exposed?</em>
          </h1>
          <p style={{ color: "#7A7A9A", fontSize: isMobile ? 15 : 17, lineHeight: 1.75, maxWidth: 520, margin: "0 auto 36px" }}>
            Most organizations don't know their real risk profile — they know their compliance status. Those are not the same thing. This assessment maps your human and AI risk exposure across six categories and shows you exactly where the gaps are.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 36, overflow: "hidden" }}>
            <RadarChart
              scores={CATEGORIES.reduce((a, c, i) => ({ ...a, [c]: 1.5 + Math.sin(i) * 0.8 }), {} as Record<Category, number>)}
              size={radarSize}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              return (
                <div key={cat} style={{ background: "#0F0F1E", border: `1px solid ${meta.color}30`, borderRadius: 20, padding: "5px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: meta.color, fontSize: 11 }}>{meta.icon}</span>
                  <span style={{ color: "#A8A8C8", fontSize: isMobile ? 11 : 13 }}>{cat}</span>
                </div>
              );
            })}
          </div>
          <button onClick={() => setStep("questions")} style={{ ...primaryBtn, width: isMobile ? "100%" : "auto" }}>
            Start the Assessment →
          </button>
          <p style={{ color: "#2A2A4A", fontSize: 10, marginTop: 12, letterSpacing: "0.06em" }}>12 QUESTIONS · NO JARGON · PERSONALIZED RESULTS</p>
          <div style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid #12121E" }}>
            <p style={{ color: "#2A2A4A", fontSize: 10, marginBottom: 6, letterSpacing: "0.1em" }}>CREATED BY</p>
            <p style={{ color: "#C8A96E", fontWeight: 700, fontSize: 14, letterSpacing: "0.05em" }}>LAKEIDRA SMITH</p>
            <p style={{ color: "#5A5A7A", fontSize: 13 }}>Strategic Risk Advisor · The Cyber Consultant</p>
          </div>
        </div>
      </Shell>
    );
  }

  // ─── QUESTIONS ─────────────────────────────────────────────────────────────

  if (step === "questions") {
    const q = QUESTIONS[currentQ];
    const meta = CATEGORY_META[q.category];
    const progress = (currentQ / QUESTIONS.length) * 100;
    const catProgress = QUESTIONS.filter((x) => x.category === q.category).indexOf(q) + 1;
    const catTotal = QUESTIONS.filter((x) => x.category === q.category).length;

    return (
      <Shell>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: isMobile ? "20px 16px 40px" : "32px 24px 48px" }}>
          {/* Progress */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ color: meta.color, fontSize: 13 }}>{meta.icon}</span>
                <span style={{ color: meta.color, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em" }}>{q.category.toUpperCase()}</span>
                <span style={{ color: "#2A2A4A", fontSize: 10 }}>· {catProgress}/{catTotal}</span>
              </div>
              <span style={{ color: "#2A2A4A", fontSize: 10 }}>{currentQ + 1} / {QUESTIONS.length}</span>
            </div>
            <div style={{ height: 2, background: "#12121E", borderRadius: 1 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${meta.color}, #C8A96E)`, borderRadius: 1, transition: "width 0.5s ease" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 250px", gap: isTablet ? 20 : 32, alignItems: "start" }}>
            {/* Question */}
            <div style={{ opacity: animating ? 0 : 1, transform: animating ? "translateX(-6px)" : "translateX(0)", transition: "all 0.2s ease" }}>
              <div style={{ background: "#0A0A18", border: `1px solid ${meta.color}20`, borderRadius: 14, padding: isMobile ? "18px 16px" : "24px 22px", marginBottom: 12 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? 18 : 22, color: "#E8E8F0", lineHeight: 1.45, fontWeight: 600, marginBottom: 10 }}>
                  {q.question}
                </h2>
                <p style={{ color: "#4A4A6A", fontSize: 13, lineHeight: 1.6, fontStyle: "italic" }}>{q.context}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => selectAnswer(q.id, opt.score)}
                    style={{ background: "#0A0A18", border: "1px solid #12121E", borderRadius: 10, padding: isMobile ? "12px 14px" : "14px 18px", textAlign: "left", color: "#9A9AB8", fontSize: isMobile ? 13 : 14, cursor: "pointer", transition: "all 0.15s ease", lineHeight: 1.5, fontFamily: "inherit", display: "flex", alignItems: "flex-start", gap: 11 }}
                    onMouseOver={(e) => { const el = e.currentTarget; el.style.borderColor = meta.color; el.style.color = "#E8E8F0"; el.style.background = "#0F0F20"; }}
                    onMouseOut={(e) => { const el = e.currentTarget; el.style.borderColor = "#12121E"; el.style.color = "#9A9AB8"; el.style.background = "#0A0A18"; }}
                  >
                    <span style={{ width: 20, height: 20, borderRadius: "50%", border: `1px solid ${meta.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: meta.color, fontSize: 10, fontWeight: 700, marginTop: 2 }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt.label}
                  </button>
                ))}
              </div>
              {currentQ > 0 && (
                <button onClick={() => setCurrentQ((q) => q - 1)}
                  style={{ marginTop: 14, background: "transparent", border: "none", color: "#2A2A4A", fontSize: 13, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                  ← Previous
                </button>
              )}
            </div>

            {/* Sidebar: full radar on desktop, compact bars on tablet/mobile */}
            {!isTablet ? (
              <div style={{ position: "sticky", top: 20 }}>
                <div style={{ background: "#0A0A18", border: "1px solid #12121E", borderRadius: 14, padding: 18 }}>
                  <p style={{ color: "#3A3A5A", fontSize: 9, letterSpacing: "0.12em", textAlign: "center", marginBottom: 10 }}>LIVE RISK PROFILE</p>
                  <div style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
                    <RadarChart scores={categoryScores} size={190} />
                  </div>
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                    {CATEGORIES.map((cat) => {
                      const m = CATEGORY_META[cat];
                      const score = categoryScores[cat];
                      const answered = QUESTIONS.filter((q) => q.category === cat && answers[q.id] !== undefined).length;
                      const total = QUESTIONS.filter((q) => q.category === cat).length;
                      return (
                        <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ color: m.color, fontSize: 8, width: 10, flexShrink: 0 }}>{m.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ height: 2, background: "#12121E", borderRadius: 1 }}>
                              <div style={{ height: "100%", width: `${(score / 3) * 100}%`, background: m.color, borderRadius: 1, transition: "width 0.6s ease", opacity: answered === 0 ? 0.15 : 1 }} />
                            </div>
                          </div>
                          <span style={{ color: "#2A2A4A", fontSize: 8, width: 18, textAlign: "right", flexShrink: 0 }}>{answered}/{total}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "4px 0" }}>
                <p style={{ color: "#3A3A5A", fontSize: 9, letterSpacing: "0.1em", marginBottom: 2 }}>PROGRESS BY CATEGORY</p>
                {CATEGORIES.map((cat) => {
                  const m = CATEGORY_META[cat];
                  const score = categoryScores[cat];
                  const answered = QUESTIONS.filter((q) => q.category === cat && answers[q.id] !== undefined).length;
                  const total = QUESTIONS.filter((q) => q.category === cat).length;
                  return (
                    <div key={cat} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: m.color, fontSize: 9, width: 10, flexShrink: 0 }}>{m.icon}</span>
                      <span style={{ color: "#3A3A5A", fontSize: 10, width: isMobile ? 70 : 120, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cat}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ height: 3, background: "#12121E", borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${(score / 3) * 100}%`, background: m.color, borderRadius: 2, transition: "width 0.6s ease", opacity: answered === 0 ? 0.15 : 1 }} />
                        </div>
                      </div>
                      <span style={{ color: "#2A2A4A", fontSize: 9, width: 22, textAlign: "right", flexShrink: 0 }}>{answered}/{total}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Shell>
    );
  }

  // ─── EMAIL GATE ────────────────────────────────────────────────────────────

  if (step === "email") {
    return (
      <Shell>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "32px 20px" : "48px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isTablet ? 28 : 48, alignItems: "center" }}>
            {/* Teaser radar — below form on mobile */}
            <div style={{ textAlign: "center", order: isTablet ? 2 : 1 }}>
              <p style={{ color: "#5A5A7A", fontSize: 10, letterSpacing: "0.12em", marginBottom: 14 }}>YOUR RISK PROFILE IS READY</p>
              <div style={{ position: "relative", display: "inline-block", maxWidth: "100%" }}>
                <div style={{ filter: "blur(4px)", opacity: 0.55 }}>
                  <RadarChart scores={categoryScores} size={isMobile ? 200 : 250} />
                </div>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ background: "rgba(7,7,16,0.92)", border: "1px solid #C8A96E40", borderRadius: 12, padding: "10px 16px", backdropFilter: "blur(4px)" }}>
                    <p style={{ color: "#C8A96E", fontSize: isMobile ? 11 : 12, fontWeight: 700, textAlign: "center", margin: 0, lineHeight: 1.5 }}>
                      Enter your details<br />to reveal your results
                    </p>
                  </div>
                </div>
              </div>
              <p style={{ color: "#3A3A5A", fontSize: 11, marginTop: 12 }}>6-axis risk profile · AI-written analysis · Personalized priorities</p>
            </div>
            {/* Form */}
            <div style={{ order: isTablet ? 1 : 2 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: isMobile ? 24 : 29, color: "#E8E8F0", lineHeight: 1.3, marginBottom: 10, fontWeight: 600 }}>
                Your profile is built.<br />
                <em style={{ color: "#C8A96E", fontStyle: "italic" }}>Let's reveal it.</em>
              </h2>
              <p style={{ color: "#5A5A7A", fontSize: 14, lineHeight: 1.65, marginBottom: 22 }}>
                Enter your details to unlock your full risk radar, category breakdown, and a personalized analysis written to your specific results.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                {[
                  { placeholder: "First name", value: name, set: setName, type: "text", nm: "name" },
                  { placeholder: "Your role (e.g. CISO, CFO, General Counsel)", value: role, set: setRole, type: "text", nm: "role" },
                  { placeholder: "Company name", value: company, set: setCompany, type: "text", nm: "company" },
                  { placeholder: "Work email address", value: email, set: setEmail, type: "email", nm: "email" },
                ].map((f, i) => (
                  <input key={i} type={f.type} name={f.nm} placeholder={f.placeholder} value={f.value}
                    onChange={(e) => f.set(e.target.value)} style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#C8A96E")}
                    onBlur={(e) => (e.target.style.borderColor = "#12121E")}
                  />
                ))}
              </div>
              <button onClick={generateReport} disabled={!email.trim()}
                style={{ ...primaryBtn, width: "100%", opacity: email.trim() ? 1 : 0.4, cursor: email.trim() ? "pointer" : "not-allowed" }}>
                Reveal My Risk Profile →
              </button>
              <p style={{ color: "#2A2A4A", fontSize: 11, marginTop: 10 }}>No spam. Your data stays with The Cyber Consultant.</p>
            </div>
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
            style={{ ...primaryBtn, display: "inline-block", textDecoration: "none", width: isMobile ? "100%" : "auto", textAlign: "center" as const }}>
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
