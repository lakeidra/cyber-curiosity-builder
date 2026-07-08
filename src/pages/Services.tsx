import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const lines = [
  {
    title: "AI Readiness & Adoption",
    link: "/services/ai-readiness",
    audience: "Enterprise & Government",
    desc: "The nsite diagnostic, adoption strategy, AI agent and process automation, and M-25-21 readiness documentation. For organizations that deployed AI and are still waiting on the ROI.",
    items: ["nsite workforce diagnostic & Translation Gap Score", "AI adoption strategy & change management", "Copilot, Power Automate & Power Platform automation", "OMB M-25-21 readiness documentation support"],
    nsiteLink: "/services/nsite",
  },
  {
    title: "Advisory & Foresight",
    link: "/services/advisory",
    audience: "Enterprise & Government",
    desc: "Structured advisory built on the FACE Tomorrow methodology, plus technology advisory and program management for large, multi-stakeholder initiatives.",
    items: ["Foresight Audit", "FACE Tomorrow Transformation", "Ongoing Advisory Retainer", "Board briefings, enterprise architecture strategy & program management"],
  },
  {
    title: "Workforce Development & Training",
    link: "/services/workforce-development",
    audience: "Enterprise, Government & Education",
    desc: "Curriculum design and delivery proven at national scale, from AI literacy to cybersecurity upskilling, instructor-led and virtual.",
    items: ["Custom curriculum design & licensing", "AI literacy & cybersecurity upskilling at scale", "Executive workshops & tabletop exercises", "Train-the-trainer programs"],
  },
  {
    title: "Cybersecurity & IT Modernization",
    link: "/services/cybersecurity-modernization",
    audience: "Government & Enterprise IT",
    desc: "Contract-scale technical delivery with cleared, credentialed personnel for agencies and IT organizations modernizing their infrastructure.",
    items: ["Zero Trust architecture & enterprise security", "NIST-aligned risk & control assessment support", "Cloud architecture & migration (Azure, AWS, M365)", "Cleared staff augmentation & managed support"],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 text-center max-w-[840px] mx-auto">
          <AnimatedSection>
            <p className="eyebrow mb-6">What We Do</p>
            <h1 className="font-serif text-[40px] md:text-5xl lg:text-[4.5rem] leading-[1.1] mb-6">
              Technology problems are rarely
              <br />
              <em className="text-gold">technology problems.</em>
            </h1>
            <p className="text-cream/70 text-lg leading-relaxed max-w-[680px] mx-auto">
              Every engagement we run starts from the same conviction: the gap between what technical teams build and what leaders understand is where risk lives and value dies. Our four service lines exist to close it.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service lines */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-28">
          <div className="space-y-8">
            {lines.map((line, i) => (
              <AnimatedSection key={line.title} delay={i * 0.06}>
                <div className="bg-background rounded-lg border border-gold/20 p-8 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
                  <div>
                    <p className="eyebrow mb-2 text-gold-dark">{line.audience}</p>
                    <h2 className="font-serif text-[26px] md:text-[32px] leading-[1.15] mb-3">{line.title}</h2>
                    <p className="text-muted-foreground text-[16px] leading-[1.7] mb-5 max-w-[620px]">{line.desc}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-3">
                      {line.items.map((item) => (
                        <li key={item} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="text-gold-dark mt-[2px]">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {"nsiteLink" in line && line.nsiteLink && (
                      <Link
                        to={line.nsiteLink}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-gold-dark hover:underline"
                      >
                        Learn more about nsite <ArrowRight size={13} />
                      </Link>
                    )}
                  </div>
                  <Button variant="hero-primary" asChild className="lg:self-center">
                    <Link to={line.link}>
                      View Details <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Government cross-link */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20 md:py-24 text-center max-w-[720px] mx-auto">
          <AnimatedSection>
            <p className="eyebrow mb-4">Contracting With Us</p>
            <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.15] mb-5">
              Buying for a federal, state, or local agency?
            </h2>
            <p className="text-cream/70 text-[17px] leading-[1.7] mb-8">
              Our certifications, NAICS codes, past performance, and capability statement live on our government page, built for contracting officers and program managers.
            </p>
            <Button variant="hero-primary" size="lg" asChild>
              <Link to="/government">Go to Government Capabilities</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Lead magnet CTA */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 text-center max-w-[680px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-[28px] md:text-[36px] leading-[1.15] mb-4">
              Not sure where to start? Start with a score.
            </h2>
            <p className="text-muted-foreground text-[16px] leading-[1.7] mb-8">
              Our free AI Readiness Check takes two minutes and gives you a directional read on where your rollout stands and what to look at first.
            </p>
            <Button variant="hero-primary" size="lg" asChild>
              <Link to="/ai-readiness-check">Take the Free Check</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
