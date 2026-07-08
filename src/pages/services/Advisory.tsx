import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const face = [
  { letter: "F", word: "Foresight", desc: "See the decisions coming before they arrive on your desk as emergencies." },
  { letter: "A", word: "Alignment", desc: "Get leadership and technical teams reading from the same page, in the same language." },
  { letter: "C", word: "Curiosity", desc: "Replace fear-based decision-making with informed, confident questioning." },
  { letter: "E", word: "Execution", desc: "Turn strategy into governance, habits, and decisions that hold up under pressure." },
];

const containers = [
  {
    name: "Foresight Audit",
    format: "Fixed-scope engagement",
    desc: "A structured diagnostic of how your organization makes technology decisions today. Where the translation gap lives, what it's costing you, and a prioritized roadmap for closing it. The starting point for most advisory relationships.",
  },
  {
    name: "FACE Tomorrow Transformation",
    format: "Multi-month program",
    desc: "The full methodology, applied. We work alongside your executive team to install the foresight practices, alignment rituals, and decision frameworks that make your leadership genuinely ready for what's coming, not just briefed on it.",
  },
  {
    name: "Advisory Retainer",
    format: "Ongoing monthly partnership",
    desc: "Continuous strategic access for leaders who want a trusted advisor in the room, or one call away, as AI, cyber risk, and technology decisions keep arriving. Typically follows an Audit or Transformation.",
  },
];

const govAdvisory = [
  "Technical project and program management of large, multi-stakeholder IT programs",
  "Enterprise architecture strategy and IT cost optimization",
  "Technology adoption and organizational change management",
  "Executive and board-level briefings that translate technical risk into mission language",
];

const Advisory = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-6">Advisory & Foresight</p>
            <h1 className="font-serif text-[40px] md:text-5xl lg:text-[4rem] leading-[1.1] mb-6">
              Your technical team can explain it.
              <br />
              <em className="text-gold">Can your leadership act on it?</em>
            </h1>
            <p className="text-cream/75 text-lg leading-relaxed mb-10 max-w-[640px]">
              The most expensive gap in your organization isn't in your infrastructure. It's between the people who understand the technology and the people accountable for the decisions. Our advisory practice exists to close that gap, permanently.
            </p>
            <Button variant="hero-primary" size="lg" asChild>
              <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                Start With a Conversation
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* FACE framework */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">The Methodology</p>
            <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.15] mb-6 max-w-[720px]">
              FACE Tomorrow™: the framework for leaders who refuse to be blindsided.
            </h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-14 max-w-[700px]">
              Every advisory engagement runs on the same spine. Four disciplines, installed in sequence, that turn reactive leadership teams into ones that see around corners.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {face.map((f, i) => (
              <AnimatedSection key={f.word} delay={i * 0.08}>
                <div className="bg-background rounded-lg p-7 h-full border border-gold/20">
                  <span className="font-serif text-[52px] text-gold-dark leading-none block mb-3">{f.letter}</span>
                  <h3 className="font-semibold text-[18px] mb-2">{f.word}</h3>
                  <p className="text-muted-foreground text-[14px] leading-[1.65]">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Containers */}
      <section className="bg-background">
        <div className="container-page py-24 md:py-28">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">How We Engage</p>
            <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.15] mb-12 max-w-[700px]">
              Three ways in, one methodology throughout.
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {containers.map((c, i) => (
              <AnimatedSection key={c.name} delay={i * 0.06}>
                <div className="bg-cream rounded-lg border border-gold/20 p-8 md:p-10 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
                  <div>
                    <h3 className="font-serif text-[24px] leading-tight mb-1">{c.name}</h3>
                    <p className="text-gold-dark text-sm font-semibold">{c.format}</p>
                  </div>
                  <p className="text-muted-foreground text-[16px] leading-[1.7]">{c.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground text-sm italic mt-8 max-w-[640px]">
              Board briefings and executive tabletop exercises are also available as standalone engagements, and often serve as the first step into an advisory relationship.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Government advisory */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-28 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-4">For Government Agencies</p>
            <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.15] mb-6">
              Technology advisory and program management at contract scale.
            </h2>
            <p className="text-cream/70 text-[17px] leading-[1.7] mb-8 max-w-[700px]">
              Agencies engage us as prime or subcontractor for advisory and program management support on complex technology initiatives.
            </p>
            <ul className="space-y-4 mb-10">
              {govAdvisory.map((item) => (
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
              The best time to build foresight was last quarter.
            </h2>
            <p className="text-muted-foreground text-[16px] leading-[1.7] mb-8">
              The second best time is a 30-minute discovery call.
            </p>
            <Button variant="hero-primary" size="lg" asChild>
              <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Discovery Call
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Advisory;
