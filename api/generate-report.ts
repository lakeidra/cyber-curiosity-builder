import { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface ReportRequest {
  email: string;
  name: string;
  role: string;
  company: string;
  scores: Record<string, number>;
  totalScore: number;
  maxScore: number;
  riskLevel: string;
  categories: Record<string, number>;
}

interface EmailJSRequest {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: {
    to_email: string;
    to_name: string;
    company_name: string;
    report_content: string;
    risk_level: string;
  };
}

/**
 * Calls Claude API to generate a personalized risk report
 */
async function generatePersonalizedReport(
  data: ReportRequest
): Promise<string> {
  const prompt = `You are a cybersecurity risk advisor. Based on the following assessment results, write a personalized, compelling 2-3 paragraph risk exposure report that is professional but conversational.

Lead Information:
- Name: ${data.name}
- Role: ${data.role}
- Company: ${data.company}

Assessment Results:
- Overall Risk Level: ${data.riskLevel}
- Total Score: ${data.totalScore}/${data.maxScore}
- Category Scores:
${Object.entries(data.categories)
  .map(([cat, score]) => `  - ${cat}: ${score.toFixed(1)}/3`)
  .join("\n")}

Write a report that:
1. Opens with their specific risk level and what it means
2. Highlights their strongest and weakest areas (draw from the category scores)
3. Provides 2-3 specific, actionable next steps tailored to their company size/role
4. Ends with an invitation to discuss their risk profile in depth

Be specific, use their company name, and make it feel personal — not generic.`;

  const message = await anthropic.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // Extract text from response
  const textContent = message.content.find((block) => block.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text content in Claude response");
  }

  return textContent.text;
}

/**
 * Sends email via EmailJS containing the personalized report
 */
async function sendEmailWithReport(
  email: string,
  name: string,
  company: string,
  reportContent: string,
  riskLevel: string
): Promise<void> {
  const emailJSPayload: EmailJSRequest = {
    service_id: process.env.EMAILJS_SERVICE_ID || "",
    template_id: process.env.EMAILJS_TEMPLATE_ID || "",
    user_id: process.env.EMAILJS_PUBLIC_KEY || "",
    template_params: {
      to_email: email,
      to_name: name,
      company_name: company,
      report_content: reportContent,
      risk_level: riskLevel,
    },
  };

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailJSPayload),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`EmailJS error: ${response.status} - ${errorData}`);
  }
}

/**
 * Main handler function
 */
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
): Promise<void> {
  // Only allow POST requests
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const data: ReportRequest = request.body;

    // Validate required fields
    if (!data.email || !data.name || !data.company || !data.role) {
      response.status(400).json({
        error: "Missing required fields: email, name, company, role",
      });
      return;
    }

    // Generate personalized report using Claude
    const reportContent = await generatePersonalizedReport(data);

    // Send email with report via EmailJS
    await sendEmailWithReport(
      data.email,
      data.name,
      data.company,
      reportContent,
      data.riskLevel
    );

    response.status(200).json({
      success: true,
      message: "Report generated and email sent successfully",
      report: reportContent,
    });
  } catch (error) {
    console.error("Error in generate-report:", error);
    response.status(500).json({
      error: "Failed to generate report and send email",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
