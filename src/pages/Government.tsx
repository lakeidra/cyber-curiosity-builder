import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Download } from "lucide-react";

const naicsCodes = [
  { code: "518210", label: "Data Processing, Hosting & Related Services" },
  { code: "541511", label: "Custom Computer Programming Services" },
  { code: "541512", label: "Computer Systems Design Services" },
  { code: "541519", label: "Other Computer Related Services" },
  { code: "541611", label: "Administrative & General Management Consulting" },
  { code: "541618", label: "Other Management Consulting Services" },
  { code: "541690", label: "Other Scientific & Technical Consulting" },
  { code: "541990", label: "All Other Professional, Scientific & Technical Services" },
  { code: "561621", label: "Security Systems Services" },
  { code: "611420", label: "Computer Training" },
  { code: "611430", label: "Professional & Management Development Training" },
  { code: "611710", label: "Educational Support Services" },
];

const capabilities = [
  {
    title: "Cloud, IT Modernization & Info Management",
    link: "/services/cybersecurity-modernization",
    items: ["Cloud architecture, migration & modernization (Azure, AWS, M365)", "M365, SharePoint & Power Platform deployment and workflow automation", "Enterprise systems administration & large-scale endpoint/OS migration", "Information and records management"],
  },
  {
    title: "Cybersecurity & Information Security",
    link: "/services/cybersecurity-modernization",
    items: ["Zero Trust architecture & enterprise security", "Security program, policy & governance documentation support", "NIST-aligned risk & security control assessment support", "Cleared cybersecurity & IT personnel for staff augmentation"],
  },
  {
    title: "AI Adoption, Automation & Workforce Enablement",
    link: "/services/ai-readiness",
    items: ["AI agent & process-automation development (Copilot, Power Automate, Power Platform)", "AI adoption readiness assessment supporting M-25-21 documentation requirements", "AI literacy & workforce upskilling curriculum, instructor-led and virtual, at scale"],
  },
  {
    title: "Technology Advisory & Program Management",
    link: "/services/advisory",
    items: ["Technical project & program management of large, multi-stakeholder IT programs", "Enterprise architecture strategy & IT cost optimization", "Technology adoption & organizational change management"],
  },
];

const differentiators = [
  "Cleared, credentialed personnel",
  "Cloud and AI implementation depth",
  "Proven training capabilities at scale",
  "Proprietary AI readiness diagnostic",
];

const Government = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          <AnimatedSection>
            <p className="eyebrow mb-6">Government Capabilities</p>
            <h1 className="font-serif text-[40px] md:text-5xl lg:text-[4rem] leading-[1.1] mb-6 max-w-[760px]">
              Built to perform.
              <br />
              <em className="text-gold">Certified to compete.</em>
            </h1>
            <p className="text-cream/75 text-lg leading-relaxed mb-8 max-w-[640px]">
              The Cyber Consultant, LLC delivers cybersecurity, information technology, and workforce training and readiness services to federal, state, and local government. We provide cleared delivery personnel and a vetted partner network to perform at contract scale, and we hold proprietary capability in AI adoption readiness measurement that directly supports federal AI workforce mandates, including OMB M-25-21. We perform as a prime and as a subcontractor, and we staff to contract requirements on award.
            </p>
            <Button variant="hero-primary" size="lg" asChild>
              <a href="/TCC-Capability-Statement.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2" size={18} /> Download Capability Statement
              </a>
            </Button>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="border border-gold/30 rounded-lg p-8 bg-navy-light min-w-[280px]">
              <p className="eyebrow mb-5 text-gold">At a Glance</p>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-cream/50 uppercase tracking-wider text-xs mb-1">Certifications</dt>
                  <dd className="text-cream">WOSB · EDWOSB</dd>
                </div>
                <div>
                  <dt className="text-cream/50 uppercase tracking-wider text-xs mb-1">UEI / DUNS</dt>
                  <dd className="text-cream">118080819</dd>
                </div>
                <div>
                  <dt className="text-cream/50 uppercase tracking-wider text-xs mb-1">CAGE Code</dt>
                  <dd className="text-cream">9HZZ3</dd>
                </div>
                <div>
                  <dt className="text-cream/50 uppercase tracking-wider text-xs mb-1">Point of Contact</dt>
                  <dd className="text-cream">Lakeidra Smith, CEO<br /><a href="mailto:lakeidra@the-cyber-consultant.com" className="text-gold hover:underline">lakeidra@the-cyber-consultant.com</a></dd>
                </div>
              </dl>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-cream border-b border-gold/20">
        <div className="container-page py-14 md:py-16">
          <AnimatedSection>
            <p className="eyebrow text-center mb-8 text-gold-dark">What Sets TCC Apart</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((d, i) => (
              <AnimatedSection key={d} delay={i * 0.08}>
                <div className="text-center px-4">
                  <span className="block h-[2px] w-8 bg-gold mx-auto mb-4" aria-hidden="true" />
                  <p className="font-semibold text-[15px]">{d}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-28">
          <AnimatedSection>
            <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.15] mb-12">Core Capabilities</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <AnimatedSection key={cap.title} delay={i * 0.06}>
                <div className="bg-background rounded-lg border border-gold/20 p-8 h-full flex flex-col">
                  <h3 className="font-serif text-[22px] md:text-[24px] mb-4">{cap.title}</h3>
                  <ul className="space-y-3 mb-6 flex-1">
                    {cap.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-foreground/80 text-[14px] leading-[1.6]">
                        <span className="text-gold-dark mt-[2px]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to={cap.link} className="text-sm font-semibold text-gold-dark hover:underline">
                    Learn more →
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* NAICS */}
      <section className="bg-background">
        <div className="container-page py-20 md:py-28">
          <AnimatedSection>
            <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.15] mb-4">NAICS Codes</h2>
            <p className="text-muted-foreground text-[16px] mb-10 max-w-[600px]">
              We are registered and ready to compete under the following classifications.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {naicsCodes.map((n, i) => (
              <AnimatedSection key={n.code} delay={i * 0.03}>
                <div className="flex items-center gap-4 bg-cream border border-gold/20 rounded-lg px-5 py-4">
                  <span className="font-serif text-gold-dark text-[20px]">{n.code}</span>
                  <span className="text-sm text-foreground/80">{n.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Past performance */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20 md:py-28 max-w-[860px]">
          <AnimatedSection>
            <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.15] mb-10">Past Performance</h2>
          </AnimatedSection>
          <div className="space-y-6">
            <AnimatedSection>
              <div className="border border-gold/30 rounded-lg p-8 bg-navy-light">
                <h3 className="font-serif text-[22px] mb-2 text-gold">Correlation One</h3>
                <p className="text-cream/70 text-[15px] leading-[1.7]">
                  Designed and delivered cybersecurity training at national scale, including Department of Defense cohorts. More than 5,000 learners trained, with program NPS improved from 22 to 79 and certification pass rates lifted from below 20% to above 50%.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <div className="border border-gold/30 rounded-lg p-8 bg-navy-light">
                <h3 className="font-serif text-[22px] mb-2 text-gold">City of Holly Springs, Mississippi</h3>
                <p className="text-cream/70 text-[15px] leading-[1.7]">
                  Municipal government engagement supporting technology and information management needs for local government operations.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 text-center max-w-[680px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-[28px] md:text-[38px] leading-[1.15] mb-4">
              Let's talk about your requirement.
            </h2>
            <p className="text-muted-foreground text-[16px] leading-[1.7] mb-8">
              Whether you're a contracting officer, a program manager, or a prime looking for a certified small business teaming partner, we'd like to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="lg" asChild>
                <a href="mailto:lakeidra@the-cyber-consultant.com">Email Lakeidra Smith, CEO</a>
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

export default Government;
