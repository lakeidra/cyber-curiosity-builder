import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const layers = [
  {
    name: "AI Knowledge",
    weight: "25%",
    desc: "Conceptual understanding, risk recognition, ethics and compliance awareness, practical application, and prompt quality.",
  },
  {
    name: "Mindset & Readiness",
    weight: "40%",
    desc: "The most predictive layer. AI anxiety, adoption willingness, psychological safety, and self-efficacy, grounded in established adoption research.",
  },
  {
    name: "Organizational Readiness",
    weight: "35%",
    desc: "Safety culture, policy clarity, leadership AI literacy, and workflow integration. This is where the Translation Gap is measured.",
  },
];

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

      {/* nsite */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">The Diagnostic</p>
            <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.15] mb-6 max-w-[760px]">
              nsite: the AI adoption diagnostic that measures your people, not just your tools.
            </h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4 max-w-[720px]">
              nsite is our proprietary assessment platform. Employees and leadership complete parallel assessments independently, and employee responses stay anonymous. The result is an honest picture no all-hands survey will ever give you.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-12 max-w-[720px]">
              Every organization receives a composite readiness score, a maturity tier from Emerging to Leading, critical risk flags, and the finding that changes the conversation: the Translation Gap Score.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {layers.map((layer, i) => (
              <AnimatedSection key={layer.name} delay={i * 0.08}>
                <div className="bg-background rounded-lg p-7 h-full border border-gold/20">
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-serif text-[21px]">{layer.name}</h3>
                    <span className="text-gold-dark font-semibold text-sm">{layer.weight}</span>
                  </div>
                  <p className="text-muted-foreground text-[15px] leading-[1.65]">{layer.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="bg-navy text-cream rounded-lg p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="eyebrow mb-3 text-gold">The Translation Gap Score</p>
                <h3 className="font-serif text-[26px] md:text-[32px] leading-[1.2] mb-4">
                  The distance between what leadership believes and what employees experience.
                </h3>
                <p className="text-cream/70 text-[16px] leading-[1.7]">
                  Executives consistently overestimate how well their AI rollout is landing. nsite is the only diagnostic that names and measures that gap as a standalone score, because it's the blind spot no amount of training can fix if nobody knows it exists.
                </p>
              </div>
              <div className="border border-gold/30 rounded-lg p-8 bg-navy-light">
                <p className="text-cream/60 text-sm mb-5 uppercase tracking-wider font-sans">We measure impactful adoption, not just adoption</p>
                <p className="text-cream/80 text-[15px] leading-[1.7] mb-4">
                  Low adoption is a liability. So is over-reliance: outsourcing judgment, skipping verification, quietly creating compliance risk.
                </p>
                <p className="text-cream/80 text-[15px] leading-[1.7]">
                  nsite flags both ends, because the goal is better AI use, not just more of it.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background">
        <div className="container-page py-24 md:py-28 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">How an Engagement Works</p>
            <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.15] mb-10">
              From score to strategy in three moves.
            </h2>
          </AnimatedSection>
          <div className="space-y-8">
            {[
              {
                step: "Assess",
                desc: "Your workforce and leadership complete the nsite assessment independently. No prep required from your team, and employee anonymity is built in.",
              },
              {
                step: "Read Out",
                desc: "We deliver a strategic readout: your readiness score, maturity tier, Translation Gap Score, risk flags, and a plain-language explanation of what's actually blocking adoption.",
              },
              {
                step: "Intervene",
                desc: "Scores prescribe specific interventions: targeted training, leadership communication coaching, change management, or policy work. You fix the real problem instead of buying more generic training.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.08}>
                <div className="flex gap-6 items-start border-b border-gold/20 pb-8">
                  <span className="font-serif text-gold-dark text-[28px] leading-none mt-1 min-w-[90px]">{item.step}</span>
                  <p className="text-muted-foreground text-[16px] leading-[1.7]">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
