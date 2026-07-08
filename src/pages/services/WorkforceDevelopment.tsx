import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const proof = [
  { number: "5,000+", label: "Learners trained through programs we designed and delivered" },
  { number: "27 → 92", label: "NPS transformation on a national cybersecurity training program" },
  { number: "DoD", label: "Curriculum designed and delivered for Department of Defense cohorts" },
];

const offerings = [
  {
    title: "Curriculum Design & Development",
    desc: "Custom AI literacy and cybersecurity curriculum built for your workforce, your industry, and your delivery model. We have designed programs for Amazon and the U.S. Department of Defense, and we bring that same rigor to workforce development organizations, agencies, and enterprises.",
  },
  {
    title: "Training Delivery at Scale",
    desc: "Instructor-led and virtual delivery that actually moves the numbers. Our track record includes taking a national program's certification pass rate from below 20% to above 50% while its satisfaction scores more than tripled.",
  },
  {
    title: "Executive Workshops & Tabletop Exercises",
    desc: "Half-day and full-day sessions for leadership teams, built around real scenarios instead of slides full of statistics. Tabletop exercises put your executives inside a live crisis simulation and expose the gap between confidence and readiness.",
  },
  {
    title: "Train-the-Trainer & Licensing",
    desc: "For organizations that want to own their capability, we license our curriculum and certify your instructors to deliver it, so the program outlives the engagement.",
  },
];

const WorkforceDevelopment = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-6">Workforce Development & Training</p>
            <h1 className="font-serif text-[40px] md:text-5xl lg:text-[4rem] leading-[1.1] mb-6">
              Your people don't need more training.
              <br />
              <em className="text-gold">They need training that works.</em>
            </h1>
            <p className="text-cream/75 text-lg leading-relaxed mb-10 max-w-[640px]">
              Most workforce training is built to check a box. Ours is built to change behavior, and we have the numbers to prove it does. From AI literacy to cybersecurity upskilling, we design and deliver programs that people actually finish, remember, and use.
            </p>
            <Button variant="hero-primary" size="lg" asChild>
              <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                Discuss Your Program
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Proof strip */}
      <section className="bg-cream border-b border-gold/20">
        <div className="container-page py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {proof.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.1}>
                <p className="font-serif text-[40px] md:text-[48px] text-gold-dark leading-none mb-3">{s.number}</p>
                <p className="text-muted-foreground text-sm max-w-[260px] mx-auto">{s.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-28">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">What We Build & Deliver</p>
            <h2 className="font-serif text-[30px] md:text-[40px] leading-[1.15] mb-12 max-w-[720px]">
              From a single workshop to a national program.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offerings.map((o, i) => (
              <AnimatedSection key={o.title} delay={i * 0.06}>
                <div className="bg-background rounded-lg p-8 h-full border border-gold/20">
                  <h3 className="font-serif text-[22px] md:text-[24px] mb-3">{o.title}</h3>
                  <p className="text-muted-foreground text-[15px] leading-[1.7]">{o.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-28 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-4">The Difference</p>
            <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.15] mb-6">
              Curiosity beats fear. Every time.
            </h2>
            <p className="text-cream/70 text-[17px] leading-[1.7] mb-4 max-w-[700px]">
              Fear-based training produces compliance theater: people who click through modules and forget them by Friday. Our programs run on the Cyber Curiosity Mindset, the framework from our founder's bestselling book, which teaches people to Pause, Ask, and Verify instead of freeze, panic, and guess.
            </p>
            <p className="text-cream/70 text-[17px] leading-[1.7] max-w-[700px]">
              The result is a workforce that thinks like risk managers, not one that's afraid of its own inbox.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Speaking cross-link */}
      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <AnimatedSection>
            <div className="bg-cream rounded-lg border border-gold/20 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="eyebrow mb-3 text-gold-dark">Keynotes & Speaking</p>
                <h2 className="font-serif text-[26px] md:text-[32px] leading-[1.2] mb-4">
                  Booking Lakeidra for your stage?
                </h2>
                <p className="text-muted-foreground text-[16px] leading-[1.7] max-w-[620px]">
                  Our founder keynotes conferences, leadership summits, and corporate events on AI readiness, cyber curiosity, and the translation gap. Speaking topics, formats, and booking details live on her speaker site.
                </p>
              </div>
              <Button variant="hero-primary" size="lg" asChild>
                <a href="https://lakeidra.com" target="_blank" rel="noopener noreferrer">
                  Visit lakeidra.com <ArrowRight className="ml-1" size={16} />
                </a>
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
              Build training your people will thank you for.
            </h2>
            <p className="text-muted-foreground text-[16px] leading-[1.7] mb-8">
              Tell us about your workforce, your goals, and your timeline. We'll tell you honestly what it will take.
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

export default WorkforceDevelopment;
