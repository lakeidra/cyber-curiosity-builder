import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const stats = [
  { number: "5,000+", label: "Learners trained, including DoD cohorts" },
  { number: "27 → 92", label: "NPS transformation on a national training program" },
  { number: "WOSB", label: "Certified Woman-Owned Small Business (and EDWOSB)" },
];

const serviceLines = [
  {
    title: "AI Readiness & Adoption",
    desc: "Most AI rollouts stall on people, not technology. Our proprietary nsite diagnostic measures where your workforce actually stands, surfaces the gap between leadership perception and employee reality, and prescribes what to fix first.",
    link: "/services/ai-readiness",
    cta: "Explore AI Readiness",
  },
  {
    title: "Advisory & Foresight",
    desc: "Strategic guidance for leaders navigating decisions their technical teams can explain but not translate. Built on the FACE Tomorrow framework: Foresight, Alignment, Curiosity, Execution.",
    link: "/services/advisory",
    cta: "Explore Advisory",
  },
  {
    title: "Workforce Development & Training",
    desc: "Curriculum designed and delivered at national scale. We have built training programs for Amazon and the U.S. Department of Defense, and we bring that rigor to yours.",
    link: "/services/workforce-development",
    cta: "Explore Training",
  },
  {
    title: "Cybersecurity & IT Modernization",
    desc: "Zero Trust architecture, NIST-aligned assessment support, cloud migration, and cleared personnel for government and enterprise IT organizations that need delivery at contract scale.",
    link: "/services/cybersecurity-modernization",
    cta: "Explore Cyber & IT",
  },
];

const testimonials = [
  {
    quote: "Lakeidra has an extraordinary ability to take complex cybersecurity concepts and make them accessible to any audience. Our team left her workshop with actionable habits they still use months later.",
    name: "Workshop Client",
    title: "Corporate L&D Director",
  },
  {
    quote: "She doesn't just inform. She transforms how people think about their role in security. Our leadership team finally understands that cybersecurity is a business function, not just an IT one.",
    name: "Executive Briefing Client",
    title: "CEO, Mid-Market Company",
  },
  {
    quote: "The Cyber Curiosity framework gave our workforce development program the structure and credibility it needed. Lakeidra's curriculum design expertise is unmatched.",
    name: "Curriculum Partner",
    title: "Workforce Development Director",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Section 1 — Hero: company thesis */}
      <section className="bg-navy text-cream relative overflow-hidden">
        {/* subtle gold seam motif */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden lg:block" aria-hidden="true" />
        <div className="container-page py-24 md:py-32 lg:py-40 text-center max-w-[900px] mx-auto relative">
          <AnimatedSection>
            <p className="eyebrow mb-6">Helping Humans Understand Machines</p>
            <h1 className="font-serif text-[40px] md:text-5xl lg:text-[4.5rem] leading-[1.1] mb-6">
              You're accountable for the technology.
              <br />
              <em className="text-gold">The results depend on your people.</em>
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed mb-10 max-w-[640px] mx-auto">
              Most AI and modernization investments miss their targets, and it's almost never the platform. It's the gap between what you deployed and what your organization is ready to do with it. TCC closes that gap: we diagnose it with nsite, advise you through it, train your workforce past it, and put skilled hands on delivery when you need them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="lg" asChild>
                <Link to="/ai-readiness-check">Take the Free AI Readiness Check</Link>
              </Button>
              <Button variant="hero-ghost" size="lg" asChild>
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 2 — Two paths, one firm (signature element) */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Enterprise path */}
          <div className="bg-cream text-foreground relative">
            <div className="px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:py-28 max-w-[640px] lg:ml-auto">
              <AnimatedSection>
                <p className="eyebrow mb-4 text-gold-dark">For Enterprise Leaders</p>
                <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.15] mb-5">
                  Start with evidence, not another initiative.
                </h2>
                <p className="text-muted-foreground text-[17px] leading-[1.7] mb-8">
                  For CIOs, CTOs, and executive teams at mid-market organizations. Before you spend another dollar on tools or training, measure where your workforce actually stands. nsite shows you the gap; our advisory and training close it.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero-primary" asChild>
                    <Link to="/services/ai-readiness">
                      Start With a Diagnostic <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-navy/30 text-foreground hover:bg-navy hover:text-cream" asChild>
                    <Link to="/services/advisory">See Advisory Programs</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Gold seam on large screens */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gold hidden lg:block z-10" aria-hidden="true" />

          {/* Government path */}
          <div className="bg-navy text-cream relative">
            <div className="px-6 md:px-12 lg:px-16 py-20 md:py-24 lg:py-28 max-w-[640px] lg:mr-auto">
              <AnimatedSection delay={0.1}>
                <p className="eyebrow mb-4">For Government</p>
                <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.15] mb-5">
                  The mandate requires skills your agency doesn't have in-house. Ours does.
                </h2>
                <p className="text-cream/70 text-[17px] leading-[1.7] mb-8">
                  Federal AI and modernization mandates don't come with the workforce to execute them. TCC delivers the capability gap end to end: cleared, credentialed personnel for implementation, readiness measurement that supports M-25-21 documentation, and training that builds the skills your team keeps after we leave. WOSB and EDWOSB certified, performing as prime and subcontractor.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero-primary" asChild>
                    <Link to="/government">
                      View Our Capabilities <ArrowRight className="ml-1" size={16} />
                    </Link>
                  </Button>
                  <Button variant="hero-ghost" size="default" asChild>
                    <a href="/TCC-Capability-Statement.pdf" target="_blank" rel="noopener noreferrer">
                      Download Capability Statement
                    </a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Service lines */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection>
            <p className="eyebrow text-center mb-4 text-gold-dark">What We Do</p>
            <h2 className="font-serif text-[32px] md:text-[48px] leading-[1.15] text-center mb-14 max-w-[760px] mx-auto">
              Four service lines. One mission: make technology make sense.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceLines.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.08}>
                <Link
                  to={s.link}
                  className="group block bg-background rounded-lg p-8 h-full border border-gold/20 hover:border-gold transition-colors"
                >
                  <h3 className="font-serif text-[24px] md:text-[26px] mb-3 group-hover:text-gold-dark transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-[16px] leading-[1.7] mb-5">{s.desc}</p>
                  <span className="text-sm font-semibold text-gold-dark inline-flex items-center gap-1">
                    {s.cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — nsite spotlight */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <p className="eyebrow mb-4">Proprietary Diagnostic</p>
            <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.15] mb-6">
              nsite measures what your AI dashboards can't: <em className="text-gold">your people.</em>
            </h2>
            <p className="text-cream/70 text-[17px] leading-[1.7] mb-4">
              Three out of four executives think their AI rollout is going well. Fewer than half of their employees agree. That distance has a name: the Translation Gap. nsite is the diagnostic that measures it.
            </p>
            <p className="text-cream/70 text-[17px] leading-[1.7] mb-8">
              A research-grounded assessment across AI knowledge, mindset, and organizational readiness that tells you exactly why adoption is stalling and what intervention actually fixes it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero-primary" asChild>
                <Link to="/services/nsite">Learn About nsite</Link>
              </Button>
              <Button variant="hero-ghost" asChild>
                <Link to="/ai-readiness-check">Take the 2-Minute Check</Link>
              </Button>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="border border-gold/30 rounded-lg p-8 md:p-10 bg-navy-light">
              <p className="eyebrow mb-6 text-gold">The Translation Gap, in numbers</p>
              <div className="space-y-6">
                <div className="flex items-baseline gap-4 border-b border-cream/10 pb-5">
                  <span className="font-serif text-[40px] text-gold leading-none">87%</span>
                  <p className="text-cream/70 text-sm leading-snug">of executives use AI at work, versus only 27% of employees</p>
                </div>
                <div className="flex items-baseline gap-4 border-b border-cream/10 pb-5">
                  <span className="font-serif text-[40px] text-gold leading-none">70%+</span>
                  <p className="text-cream/70 text-sm leading-snug">of AI deployments fail to meet their ROI targets, and it's almost never the technology</p>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-[40px] text-gold leading-none">3 in 4</span>
                  <p className="text-cream/70 text-sm leading-snug">C-suite leaders think the rollout is going well. Fewer than half of employees agree.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 5 — Proof */}
      <section className="bg-cream border-y border-gold/20">
        <div className="container-page py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <p className="font-serif text-[44px] md:text-[52px] text-gold-dark leading-none mb-3">{s.number}</p>
                <p className="text-muted-foreground text-sm max-w-[260px] mx-auto">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Testimonials */}
      <section className="bg-background">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection>
            <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.15] text-center mb-14">
              What clients say when the jargon clears.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.title} delay={i * 0.1}>
                <div className="bg-cream rounded-lg p-8 h-full border border-gold/20 flex flex-col">
                  <p className="text-foreground/80 text-[15px] leading-[1.7] mb-6 flex-1">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.title}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — Final CTA */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 text-center max-w-[720px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-[32px] md:text-[48px] leading-[1.15] mb-5">
              Ready to close your translation gap?
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-10">
              Whether you're leading an enterprise AI rollout or delivering on a government mission, the first step is a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="lg" asChild>
                <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                  Schedule a Discovery Call
                </a>
              </Button>
              <Button variant="hero-ghost" size="lg" asChild>
                <Link to="/government">Government Buyers Start Here</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
