import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

// ─── The 7-question executive diagnostic (nsite free lead magnet) ─────────────

interface Option {
  label: string;
  score: number;
  flag?: "confidence" | "unknown";
}

interface Question {
  id: string;
  question: string;
  context?: string;
  options: Option[];
  scored: boolean;
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    question: "Where are you in your AI rollout?",
    context: "Formal or informal. If your people are using AI tools, you have a rollout.",
    scored: false,
    options: [
      { label: "Pre-rollout, still planning", score: 0 },
      { label: "0 to 6 months in", score: 0 },
      { label: "6 to 12 months in", score: 0 },
      { label: "More than a year in", score: 0 },
    ],
  },
  {
    id: "q2",
    question: "Are you seeing the ROI you projected?",
    scored: true,
    options: [
      { label: "Yes, we're hitting our targets", score: 3 },
      { label: "Partially", score: 2 },
      { label: "Too early to tell", score: 1 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: "q3",
    question: "Roughly what percentage of your workforce is actively using AI tools today?",
    context: "Your honest estimate, not the license count.",
    scored: true,
    options: [
      { label: "Under 10%", score: 0 },
      { label: "10 to 25%", score: 1 },
      { label: "25 to 50%", score: 2 },
      { label: "Over 50%", score: 3 },
    ],
  },
  {
    id: "q4",
    question: "How would you characterize employee sentiment about AI at your company?",
    scored: true,
    options: [
      { label: "Positive, people are leaning in", score: 3 },
      { label: "Mixed", score: 1 },
      { label: "Negative, there's real resistance", score: 0 },
      { label: "Honestly, I don't know", score: 0, flag: "unknown" },
    ],
  },
  {
    id: "q5",
    question: "Have you deployed AI training, and if so, has it driven adoption?",
    scored: true,
    options: [
      { label: "Yes, and it's been effective", score: 3 },
      { label: "Yes, but with limited impact", score: 1 },
      { label: "Deployed, but not yet evaluated", score: 1, flag: "unknown" },
      { label: "Not yet deployed", score: 0 },
    ],
  },
  {
    id: "q6",
    question: "How aligned are your leadership team and your employees on AI use and expectations?",
    scored: true,
    options: [
      { label: "Strongly aligned", score: 3 },
      { label: "Somewhat aligned", score: 2 },
      { label: "Not aligned", score: 0 },
      { label: "I don't know", score: 0, flag: "unknown" },
    ],
  },
  {
    id: "q7",
    question: "How confident are you in making tech buying decisions for AI in your company?",
    scored: true,
    options: [
      { label: "Very confident", score: 3 },
      { label: "Somewhat confident", score: 2 },
      { label: "Not confident", score: 0, flag: "confidence" },
      { label: "I rely on others for these calls", score: 0, flag: "confidence" },
    ],
  },
];

const MAX_SCORE = 18; // Q2 through Q7, 3 points each

interface Band {
  min: number;
  title: string;
  read: string;
  intervention: string;
}

const BANDS: Band[] = [
  {
    min: 14,
    title: "Strong Footing",
    read: "Your rollout shows healthy signals across ROI, sentiment, and alignment. The risk at your stage isn't adoption, it's blind spots: over-reliance, unverified outputs, and the gap between what leadership believes and what employees actually experience.",
    intervention: "Companies scoring like this typically use a full diagnostic to pressure-test leadership perception against employee reality before scaling further.",
  },
  {
    min: 9,
    title: "Progressing, With Gaps",
    read: "You're moving, but something is dragging. The pattern at this score usually isn't a technology problem. It's partial alignment between leadership and workforce, training that informed people without changing behavior, or both.",
    intervention: "Companies scoring like this typically need targeted alignment work and intervention-specific training, not another general AI course.",
  },
  {
    min: 4,
    title: "Stalling",
    read: "Your answers show the classic signs of a stalled rollout: the tools are deployed, but sentiment, alignment, or measurable ROI hasn't followed. Spending more on tools or generic training from here usually makes the numbers worse, not better.",
    intervention: "Companies scoring like this typically need a readiness diagnostic and structured change management before any further AI investment.",
  },
  {
    min: 0,
    title: "High Friction",
    read: "Your rollout shows signs of serious friction across multiple dimensions. The good news: this is the most common profile we see, and it's fixable, because the cause is almost never the technology.",
    intervention: "Companies scoring like this typically need a full workforce readiness diagnostic before making any additional AI decisions.",
  },
];

type Step = "intro" | "questions" | "email" | "results";

const AIReadinessCheck = () => {
  const [step, setStep] = useState<Step>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Option>>({});
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const scoredAnswers = QUESTIONS.filter((q) => q.scored).map((q) => answers[q.id]);
  const score = scoredAnswers.reduce((sum, a) => sum + (a?.score ?? 0), 0);
  const band = BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];
  const unknownCount = Object.values(answers).filter((a) => a?.flag === "unknown").length;
  const confidenceFlag = answers["q7"]?.flag === "confidence";
  const preRollout = answers["q1"]?.label.startsWith("Pre-rollout");

  const selectOption = (option: Option) => {
    setAnswers((prev) => ({ ...prev, [QUESTIONS[current].id]: option }));
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setStep("email");
    }
  };

  const submitEmail = async (skip: boolean) => {
    if (!skip && email) {
      setSending(true);
      try {
        // Configure these in your .env to receive leads (EmailJS dashboard → Account → API Keys)
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        if (serviceId && templateId && publicKey) {
          await emailjs.send(
            serviceId,
            templateId,
            {
              user_email: email,
              score: `${score}/${MAX_SCORE}`,
              band: band.title,
              answers: QUESTIONS.map((q) => `${q.question} → ${answers[q.id]?.label ?? "n/a"}`).join("\n"),
            },
            { publicKey }
          );
        }
      } catch {
        // Never block the user's results on a lead-capture failure
      }
      setSending(false);
    }
    setStep("results");
  };

  return (
    <Layout>
      <section className="bg-navy text-cream min-h-[80vh]">
        <div className="container-page py-20 md:py-28 max-w-[720px] mx-auto">
          {/* ─── Intro ─── */}
          {step === "intro" && (
            <div className="text-center">
              <p className="eyebrow mb-6">Free AI Readiness Check</p>
              <h1 className="font-serif text-[36px] md:text-5xl leading-[1.1] mb-6">
                Is your AI rollout actually working?
                <br />
                <em className="text-gold">Find out in 2 minutes.</em>
              </h1>
              <p className="text-cream/70 text-lg leading-relaxed mb-4 max-w-[560px] mx-auto">
                Seven questions. No jargon. A directional read on where your rollout stands, what's likely blocking it, and what to look at first.
              </p>
              <p className="text-cream/50 text-sm mb-10">
                This is the executive preview of nsite, our full workforce AI readiness diagnostic.
              </p>
              <Button variant="hero-primary" size="lg" onClick={() => setStep("questions")}>
                Start the Check
              </Button>
            </div>
          )}

          {/* ─── Questions ─── */}
          {step === "questions" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="eyebrow text-gold">
                  Question {current + 1} of {QUESTIONS.length}
                </p>
                {current > 0 && (
                  <button
                    onClick={() => setCurrent(current - 1)}
                    className="text-cream/50 text-sm hover:text-gold transition-colors"
                  >
                    ← Back
                  </button>
                )}
              </div>
              {/* Progress bar */}
              <div className="h-[2px] bg-cream/10 mb-10">
                <div
                  className="h-full bg-gold transition-all duration-300"
                  style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              <h2 className="font-serif text-[26px] md:text-[32px] leading-[1.2] mb-3">
                {QUESTIONS[current].question}
              </h2>
              {QUESTIONS[current].context && (
                <p className="text-cream/50 text-[15px] mb-8">{QUESTIONS[current].context}</p>
              )}
              <div className="space-y-3 mt-8">
                {QUESTIONS[current].options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => selectOption(option)}
                    className={`w-full text-left px-6 py-4 rounded-lg border transition-colors text-[16px] ${
                      answers[QUESTIONS[current].id]?.label === option.label
                        ? "border-gold bg-gold/10 text-cream"
                        : "border-cream/15 text-cream/80 hover:border-gold/60 hover:text-cream"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ─── Email capture (optional) ─── */}
          {step === "email" && (
            <div className="text-center">
              <p className="eyebrow mb-6 text-gold">One last thing</p>
              <h2 className="font-serif text-[28px] md:text-[36px] leading-[1.15] mb-4">
                Where should we send your results?
              </h2>
              <p className="text-cream/60 text-[16px] mb-8 max-w-[480px] mx-auto">
                We'll send your score plus a short series on what it means and how companies like yours fix it. Or skip straight to your results.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 px-5 py-3 rounded-lg bg-navy-light border border-cream/20 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
                />
                <Button variant="hero-primary" onClick={() => submitEmail(false)} disabled={sending || !email}>
                  {sending ? "Sending..." : "See My Results"}
                </Button>
              </div>
              <button
                onClick={() => submitEmail(true)}
                className="text-cream/50 text-sm hover:text-gold transition-colors underline underline-offset-4"
              >
                Skip and show my results
              </button>
            </div>
          )}

          {/* ─── Results ─── */}
          {step === "results" && (
            <div>
              <p className="eyebrow mb-6 text-center text-gold">Your Readiness Read</p>
              <div className="text-center mb-10">
                <p className="font-serif text-[64px] md:text-[80px] text-gold leading-none mb-2">
                  {score}
                  <span className="text-cream/40 text-[32px]">/{MAX_SCORE}</span>
                </p>
                <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.15]">{band.title}</h2>
              </div>

              <div className="border border-gold/30 rounded-lg p-8 bg-navy-light mb-6">
                <p className="text-cream/80 text-[16px] leading-[1.7] mb-4">{band.read}</p>
                <p className="text-cream/80 text-[16px] leading-[1.7]">{band.intervention}</p>
              </div>

              {preRollout && (
                <div className="border border-gold/30 rounded-lg p-6 bg-navy-light mb-6">
                  <p className="text-cream/80 text-[15px] leading-[1.7]">
                    <span className="text-gold font-semibold">You're pre-rollout, which is the best possible time to be here.</span>{" "}
                    Measuring readiness before you invest is how you avoid joining the 70%+ of deployments that miss their ROI targets.
                  </p>
                </div>
              )}

              {unknownCount >= 2 && (
                <div className="border border-gold/30 rounded-lg p-6 bg-navy-light mb-6">
                  <p className="text-cream/80 text-[15px] leading-[1.7]">
                    <span className="text-gold font-semibold">Visibility flag:</span> you answered "I don't know" more than once. That's not a criticism, it's the finding. You can't manage what you can't see, and right now your rollout is running without instruments.
                  </p>
                </div>
              )}

              {confidenceFlag && (
                <div className="border border-gold/30 rounded-lg p-6 bg-navy-light mb-6">
                  <p className="text-cream/80 text-[15px] leading-[1.7]">
                    <span className="text-gold font-semibold">On decision confidence:</span> you're not alone. Most leaders making AI buying decisions today were never given the translation layer to make them confidently. That's precisely the gap our advisory work closes.
                  </p>
                </div>
              )}

              <div className="text-center mt-12">
                <h3 className="font-serif text-[24px] md:text-[28px] leading-[1.2] mb-4">
                  Want the full picture, not just the preview?
                </h3>
                <p className="text-cream/60 text-[15px] mb-8 max-w-[520px] mx-auto">
                  This check reads your perspective. nsite measures your whole organization, including the gap between what you just told us and what your employees would say.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero-primary" size="lg" asChild>
                    <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                      Book a Call to Dig In
                    </a>
                  </Button>
                  <Button variant="hero-ghost" size="lg" asChild>
                    <Link to="/services/ai-readiness">Learn About nsite</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AIReadinessCheck;
