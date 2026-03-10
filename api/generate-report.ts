import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  maxDuration: 30,
};

const SYSTEM_PROMPT = `You are Lakeidra Smith, a cybersecurity strategic risk advisor and author of "Cyber Curiosity: A Beginner's Guide to Cybersecurity." You help executives, CISOs, HR leaders, and C-suite teams understand cybersecurity as a human and business risk — not a technical one.

Your voice: conversational but authoritative, warm but direct. Lead with facts, anchor in humanity. Never fear-monger. Cybersecurity is fundamentally a human problem.

Your phrases: "Honestly...", "However...", "Therefore...", "Consequently...", "Prevention over reaction", "Don't trust, always verify", "I refuse to..."

BANNED: dive into, unleash, game-changing, revolutionary, transformative, leverage, optimize, tapestry, delve, "It's not just x, it's y"

Write a personalized Human + AI Risk assessment in 3 paragraphs:
1. Read their risk profile honestly — what's strong and what's exposed
2. Name the 2 highest-risk categories and what that means for the business
3. Warm, direct invitation to a conversation — not salesy, just genuine

Sign off as Lakeidra Smith, The Cyber Consultant. Under 280 words. Specific to their numbers.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
  const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!anthropicKey) {
    return res.status(500).json({ error: "Missing ANTHROPIC_API_KEY" });
  }

  const {
    email,
    name,
    role,
    company,
    scores,
    totalScore,
    maxScore,
    riskLevel,
    categories,
  } = req.body || {};

  if (!email || !scores || !totalScore || !maxScore || !riskLevel) {
    return res.status(400).json({ error: "Missing required fields: email, scores, totalScore, maxScore, riskLevel" });
  }

  // Build strongest/weakest from scores
  const catEntries = Object.entries(scores as Record<string, number>);
  const sorted = [...catEntries].sort((a, b) => a[1] - b[1]);
  const weakest = sorted.slice(0, 2).map(([k]) => k);
  const strongest = sorted.slice(-2).reverse().map(([k]) => k);
  const catSummary = catEntries.map(([k, v]) => `${k}: ${(v as number).toFixed(1)}/3`).join(" | ");
  const overallPct = Math.round((totalScore / maxScore) * 100);

  const prompt = `Generate a personalized Human + AI Risk assessment for ${name || "this leader"} (${role || "executive"}) at ${company || "their organization"}.
Overall score: ${totalScore}/${maxScore} — Risk Level: "${riskLevel}"
Category scores (0–3): ${catSummary}
Weakest: ${weakest.join(", ")} | Strongest: ${strongest.join(", ")}
Write 3 paragraphs as described. Be specific. Don't be generic.`;

  try {
    // 1. Generate report via Claude
    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const claudeData = await claudeRes.json();
    const reportText: string =
      claudeData.content
        ?.map((b: { type: string; text?: string }) => b.text ?? "")
        .join("") ?? "";

    if (!reportText) {
      return res.status(500).json({ error: "Claude returned empty report" });
    }

    // 2. Send email via EmailJS (best-effort)
    if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
      try {
        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: emailjsServiceId,
            template_id: emailjsTemplateId,
            user_id: emailjsPublicKey,
            template_params: {
              to_email: email,
              to_name: name || "there",
              company_name: company || "",
              report_content: reportText,
              risk_level: riskLevel,
            },
          }),
        });
      } catch (emailErr) {
        console.error("EmailJS send error:", emailErr);
        // Non-fatal — report was still generated
      }
    }

    return res.status(200).json({ success: true, report: reportText });
  } catch (error) {
    console.error("generate-report error:", error);
    return res.status(500).json({ error: "Failed to generate report" });
  }
}
