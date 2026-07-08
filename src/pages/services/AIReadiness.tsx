import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const govItems = [
  "AI adoption readiness assessment and workforce capability measurement supporting OMB M-25-21 documentation requirements",
  "AI agent and process-automation development with Microsoft Copilot, Power Automate, and Power Platform",
  "AI literacy and workforce upskilling curriculum design and delivery, instructor-led and virtual, at scale",
  "Technology adoption and organizational change management for agency-wide initiatives",
];

const AIReadiness = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-6">AI Readiness & Adoption</p>
            <h1 className="font-serif text-[40px] md:text-5xl lg:text-[4rem] leading-[1.1] mb-6">
              You deployed the AI.
              <br />
              <em className="text-gold">Why isn't it working?</em>
            </h1>
            <p className="text-cream/75 text-lg leading-relaxed mb-10 max-w-[640px]">
              More than 70% of AI deployments miss their ROI targets, and the cause is almost never the technology. It's people, mindset, leadership alignment, and organizational readiness. We diagnose exactly where your rollout is stalling, then prescribe the interventions that make adoption stick.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero-primary" size="lg" asChild>
                <Link to="/ai-readiness-check">Take the Free Readiness Check</Link>
              </Button>
              <Button variant="hero-ghost" size="lg" asChild>
                <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                  Book a Discovery Call
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* nsite summary card */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-28">
          <AnimatedSection>
            <div className="bg-navy text-cream rounded-lg p-8 md:p-12">
              <p className="eyebrow mb-4 text-gold">The Diagnostic Behind This Work</p>
              <h2 className="font-serif text-[28px] md:text-[36px] leading-[1.15] mb-4 max-w-[640px]">
                nsite: our proprietary AI adoption assessment.
              </h2>
              <p className="text-cream/75 text-[16px] leading-[1.7] mb-3 max-w-[720px]">
                Before we prescribe anything, we measure. nsite is our proprietary diagnostic that surveys employees and leadership in parallel — independently and anonymously — to produce a composite AI readiness score, a maturity tier, and the finding that changes every conversation: the Translation Gap Score.
              </p>
              <p className="text-cream/75 text-[16px] leading-[1.7] mb-8 max-w-[720px]">
                The Translation Gap measures the distance between what leadership believes about their AI rollout and what employees actually experience. Most organizations have never named it. nsite names it, scores it, and tells you what to do about it.
              </p>
              <Button variant="hero-ghost" asChild>
                <Link to="/services/nsite">
                  Learn More About nsite <ArrowRight className="ml-1" size={16} />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Copilot & Power Platform */}
      <section className="bg-background">
        <div className="container-page py-24 md:py-28 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">AI Agent & Process Automation</p>
            <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.15] mb-6">
              Copilot, Power Automate & Power Platform.
            </h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-6 max-w-[700px]">
              Knowing your workforce isn't ready is step one. Building the automation infrastructure that makes readiness actionable is step two. We design and deploy AI agents and workflow automations on Microsoft's Power Platform stack — Copilot, Power Automate, and Power Apps — so your people have tools that meet them where they are.
            </p>
            <ul className="space-y-3">
              {[
                "Microsoft Copilot configuration, rollout, and adoption enablement",
                "Power Automate workflow design and deployment across business functions",
                "Power Apps and Power Platform solution development",
                "AI agent development for internal operations and service delivery",
                "Governance frameworks and responsible AI policies for automation programs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/80 text-[16px] leading-[1.6]">
                  <span className="text-gold-dark mt-[3px]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* AI adoption strategy */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-28 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">Strategy & Change Management</p>
            <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.15] mb-6">
              AI adoption strategy built for the real blockers.
            </h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-6 max-w-[700px]">
              Most AI strategies focus on the technology layer. Ours starts with people. We help organizations plan and manage AI rollouts from the inside out — sequencing adoption, aligning leadership, managing resistance, and building the organizational conditions that make change stick.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-8 max-w-[700px]">
              Informed by nsite diagnostic data, our adoption strategy work is specific: we know which teams are resistant, which managers are undermining rollout, and which workflows need redesign before any training can land. We build the plan around those findings, not around a generic framework.
            </p>
            <ul className="space-y-3">
              {[
                "AI rollout sequencing and adoption roadmap development",
                "Stakeholder alignment and executive communication coaching",
                "Change management planning and employee engagement strategy",
                "Adoption milestone tracking and intervention triggers",
                "Policy and governance framework development for responsible AI use",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/80 text-[16px] leading-[1.6]">
                  <span className="text-gold-dark mt-[3px]">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* AI workforce development */}
      <section className="bg-background">
        <div className="container-page py-24 md:py-28 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">Workforce Development & Training</p>
            <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.15] mb-6">
              AI literacy and upskilling built for lasting behavior change.
            </h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-6 max-w-[700px]">
              Training without a readiness foundation is noise. Once nsite tells us where your workforce actually stands, we design AI literacy and upskilling curriculum that targets the real gaps — not a generic "AI 101" module, but instruction built around your people's actual knowledge, mindset, and workflow context.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "AI literacy curriculum design for organizational and departmental cohorts",
                "Instructor-led and virtual delivery at enterprise and government scale",
                "Role-specific upskilling tracks (executive, manager, practitioner)",
                "Prompt engineering and practical AI tool application workshops",
                "Train-the-trainer programs for organizations building internal capacity",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/80 text-[16px] leading-[1.6]">
                  <span className="text-gold-dark mt-[3px]">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="border-navy/30 hover:bg-navy hover:text-cream" asChild>
              <Link to="/services/workforce-development">
                See Full Workforce Development Offering <ArrowRight className="ml-1" size={16} />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Government framing */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-28 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-4">For Government Agencies</p>
            <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.15] mb-6">
              Built for the mandate, not just the market.
            </h2>
            <p className="text-cream/70 text-[17px] leading-[1.7] mb-8 max-w-[700px]">
              Federal AI workforce mandates require agencies to demonstrate readiness, not just intent. Our AI adoption capability directly supports that documentation burden.
            </p>
            <ul className="space-y-4 mb-10">
              {govItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-cream/80 text-[16px] leading-[1.6]">
                  <span className="text-gold mt-[3px]">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="hero-ghost" asChild>
              <Link to="/government">
                See Full Government Capabilities <ArrowRight className="ml-1" size={16} />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 text-center max-w-[680px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-[28px] md:text-[38px] leading-[1.15] mb-4">
              Find out where you actually stand.
            </h2>
            <p className="text-muted-foreground text-[16px] leading-[1.7] mb-8">
              Start with the free two-minute check, or go straight to a conversation about running nsite in your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="lg" asChild>
                <Link to="/ai-readiness-check">Take the Free Check</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-navy/30 hover:bg-navy hover:text-cream" asChild>
                <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                  Schedule a Discovery Call
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default AIReadiness;
