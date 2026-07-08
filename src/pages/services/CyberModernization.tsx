import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const cyberItems = [
  "Zero Trust architecture and enterprise security",
  "Information security program, policy, and governance documentation support",
  "Risk and security control assessment support, NIST-aligned",
  "Cleared cybersecurity and IT personnel for staff augmentation and managed support",
];

const cloudItems = [
  "Cloud architecture, migration, and modernization across Microsoft Azure, AWS, and M365",
  "Microsoft 365, SharePoint, and Power Platform deployment and workflow automation",
  "Enterprise systems administration and large-scale endpoint and OS migration",
  "Information and records management",
];

const differentiators = [
  {
    title: "Cleared, credentialed personnel",
    desc: "Our delivery bench holds active clearances and industry certifications, ready to staff to contract requirements on award.",
  },
  {
    title: "A vetted partner network",
    desc: "We perform as prime and as subcontractor, scaling delivery capacity through established teaming relationships without sacrificing quality control.",
  },
  {
    title: "Depth where it counts",
    desc: "Cloud and AI implementation experience across Azure, AWS, and the Microsoft ecosystem, led by senior architects with enterprise and defense backgrounds.",
  },
];

const CyberModernization = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-6">Cybersecurity & IT Modernization</p>
            <h1 className="font-serif text-[40px] md:text-5xl lg:text-[4rem] leading-[1.1] mb-6">
              Modern infrastructure.
              <br />
              <em className="text-gold">Mission-grade security.</em>
            </h1>
            <p className="text-cream/75 text-lg leading-relaxed mb-10 max-w-[640px]">
              For federal, state, and local agencies and enterprise IT organizations that need technical delivery at contract scale. Cleared personnel, proven cloud depth, and security practices aligned to the frameworks your auditors already speak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero-primary" size="lg" asChild>
                <Link to="/government">View Government Capabilities</Link>
              </Button>
              <Button variant="hero-ghost" size="lg" asChild>
                <a href="/TCC-Capability-Statement.pdf" target="_blank" rel="noopener noreferrer">
                  Download Capability Statement
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Two capability columns */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-background rounded-lg border border-gold/20 p-8 md:p-10 h-full">
                <p className="eyebrow mb-3 text-gold-dark">Cybersecurity & Information Security</p>
                <h2 className="font-serif text-[26px] md:text-[30px] leading-[1.15] mb-6">
                  Security programs that hold up to scrutiny.
                </h2>
                <ul className="space-y-4">
                  {cyberItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground/80 text-[15px] leading-[1.6]">
                      <span className="text-gold-dark mt-[3px]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-background rounded-lg border border-gold/20 p-8 md:p-10 h-full">
                <p className="eyebrow mb-3 text-gold-dark">Cloud, IT Modernization & Info Management</p>
                <h2 className="font-serif text-[26px] md:text-[30px] leading-[1.15] mb-6">
                  Migration and modernization without the meltdown.
                </h2>
                <ul className="space-y-4">
                  {cloudItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground/80 text-[15px] leading-[1.6]">
                      <span className="text-gold-dark mt-[3px]">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-28">
          <AnimatedSection>
            <p className="eyebrow mb-4">Why Agencies Choose TCC</p>
            <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.15] mb-12 max-w-[720px]">
              Small business agility. Contract-scale delivery.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((d, i) => (
              <AnimatedSection key={d.title} delay={i * 0.08}>
                <div className="border border-gold/30 rounded-lg p-7 h-full bg-navy-light">
                  <h3 className="font-semibold text-[18px] mb-3 text-gold">{d.title}</h3>
                  <p className="text-cream/70 text-[15px] leading-[1.65]">{d.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Human layer cross-sell */}
      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <AnimatedSection>
            <div className="bg-cream rounded-lg border border-gold/20 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="eyebrow mb-3 text-gold-dark">The Other Half of Modernization</p>
                <h2 className="font-serif text-[26px] md:text-[32px] leading-[1.2] mb-4">
                  New systems fail on old habits.
                </h2>
                <p className="text-muted-foreground text-[16px] leading-[1.7] max-w-[620px]">
                  Migration is the easy part. Adoption is where modernization projects go to die. Pair technical delivery with our workforce readiness and change management capability so the people side keeps pace with the platform.
                </p>
              </div>
              <Button variant="hero-primary" size="lg" asChild>
                <Link to="/services/ai-readiness">
                  See AI Readiness <ArrowRight className="ml-1" size={16} />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 text-center max-w-[680px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-[28px] md:text-[38px] leading-[1.15] mb-4">
              Have a requirement to discuss?
            </h2>
            <p className="text-muted-foreground text-[16px] leading-[1.7] mb-8">
              Reach us directly or grab our capability statement for your files. We respond fast, and we scope honestly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-navy/30 hover:bg-navy hover:text-cream" asChild>
                <a href="/TCC-Capability-Statement.pdf" target="_blank" rel="noopener noreferrer">
                  Download Capability Statement
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default CyberModernization;
