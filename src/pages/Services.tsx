import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";
import bookCover from "@/assets/cyber-curiosity-book.png";

const Services = () => {
  return (
    <Layout>
      {/* Section 1 — Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 text-center max-w-[800px] mx-auto">
          <AnimatedSection>
            <p className="eyebrow mb-6">What We Do</p>
            <h1 className="font-serif text-[40px] md:text-5xl lg:text-[4.5rem] leading-[1.1] mb-4">
              Cybersecurity is not a technology problem.
              <br />
              <em className="text-gold">It is a human one.</em>
            </h1>
            <p className="text-cream/70 text-lg leading-relaxed max-w-[680px] mx-auto">
              At The Cyber Consultant, we help individuals, teams, and organizations build the habits, mindset, and culture that technology alone can never provide. Every engagement is built on one philosophy: the Cyber Curiosity Mindset — Pause. Ask. Verify.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 2 — Keynote & Speaking */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32 max-w-[1000px] mx-auto">
          <AnimatedSection>
            <p className="eyebrow mb-4">Keynote & Speaking</p>
            <h2 className="font-serif text-[36px] md:text-[40px] leading-[1.15] mb-3">
              The talk your audience will still be thinking about on Monday.
            </h2>
            <p className="text-muted-foreground text-base italic mb-8">
              For conferences, corporate events, leadership summits, and professional associations.
            </p>
            <div className="max-w-[680px]">
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
                Lakeidra brings a rare combination to the stage: hands-on technical roots going back to childhood, the credibility of a published cybersecurity author, and the warmth of a storyteller who genuinely believes her audience is capable of protecting themselves. She doesn't lecture — she shifts perspective.
              </p>
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
                Her signature talk, <em>The Cyber Curiosity Mindset</em>, is available as a keynote, breakout session, or conference closing. Audiences leave with one clear mindset shift and a framework they can use before they even get back to their desks.
              </p>
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-8">
                Lakeidra has spoken at the Dell Cybersecurity Summit, Sloss Tech, Elevate & Empower Tech Events, EdFarm, and Correlation One.
              </p>
              <p className="text-[13px] text-muted-foreground italic mb-10">
                Best for: Conferences, corporate all-hands, leadership summits, and professional associations.
              </p>
            </div>
          </AnimatedSection>

          {/* Signature Talks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "The Cyber Curiosity Mindset",
                tag: "Flagship",
                desc: "How leaders can replace fear-based security messaging with a curiosity-driven approach. The most-requested talk.",
              },
              {
                title: "F.A.C.E. TOMORROW™",
                tag: "",
                desc: "The framework for leaders who refuse to be blindsided. Built for executive summits and leadership offsites.",
              },
              {
                title: "Deepfakes & Digital Deception",
                tag: "",
                desc: "When seeing is no longer believing. A timely, high-impact session for any audience navigating AI risk.",
              },
            ].map((talk, i) => (
              <AnimatedSection key={talk.title} delay={i * 0.1}>
                <div className="bg-background rounded-lg p-6 h-full border border-gold/20">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-[20px]">{talk.title}</h4>
                    {talk.tag && (
                      <span className="text-[10px] uppercase tracking-wider bg-gold/10 text-gold px-2 py-0.5 rounded font-semibold">
                        {talk.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{talk.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <p className="text-xs text-muted-foreground mb-8">
              <strong>Formats:</strong> 15-minute · 30-minute · 60-minute with audience interaction · Panel participation
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gold" asChild>
                <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                  Schedule a Discovery Call <ArrowRight size={16} />
                </a>
              </Button>
              <Button variant="gold-outline" asChild>
                <a href="/LAKEIDRA-SMITH-Speaker-One-Sheet-2026.pdf" target="_blank" rel="noopener noreferrer">
                  Download Speaker One Sheet
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 3 — Workshops & Team Training */}
      <section id="workshops" className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 max-w-[1000px] mx-auto">
          <AnimatedSection>
            <p className="eyebrow mb-4">Workshops & Team Training</p>
            <h2 className="font-serif text-[36px] md:text-[40px] leading-[1.15] mb-3">
              Your team doesn't need another compliance training.
              <br />
              <span className="text-gold">They need a repeatable instinct.</span>
            </h2>
            <p className="text-cream/60 text-base italic mb-8">For corporate teams, leadership groups, and organizational offsites.</p>
            <p className="text-cream/80 text-[17px] leading-[1.7] mb-10 max-w-[680px]">
              Our workshops are built around real scenarios, not slides full of statistics. Participants learn to recognize threats by developing the same instinct Lakeidra teaches in her book: pause, ask, verify.
            </p>
          </AnimatedSection>

          <div className="space-y-6 mb-10">
            {[
              {
                title: "The Spark Session",
                desc: "A 90-minute interactive experience for teams of up to 50. Fast, focused, and immediately actionable. Perfect as a lunch-and-learn or team meeting. Available virtually or in-person.",
              },
              {
                title: "The Cyber Curiosity Workshop",
                desc: "A half-day experience for teams of up to 25. The full Cyber Curiosity methodology — habit assessment, scenario simulations, and a personalized action plan for your organization. Each participant receives a copy of Cyber Curiosity.",
              },
              {
                title: "The Executive Cyber Briefing",
                desc: "A focused 60-minute strategic session for leadership teams of 10–20. Not a training — a real conversation in the language executives speak: business continuity, liability, and decision-making. Ends with three tailored recommendations.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-navy-light rounded-lg p-6 border border-gold/15">
                  <h4 className="font-semibold text-[20px] mb-2 text-cream">{item.title}</h4>
                  <p className="text-cream/70 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <p className="text-[13px] text-cream/60 italic mb-8">
              Best for: SMBs, corporate L&D and HR initiatives, leadership retreats, and company offsites. Lakeidra has delivered sessions for FDIC companies, start-ups, corporates, and educational institutions.
            </p>
            <Button variant="hero-primary" asChild>
              <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Discovery Call <ArrowRight size={16} />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 4 — Advisory Services */}
      <section id="advisory" className="bg-cream">
        <div className="container-page py-24 md:py-32 max-w-[1000px] mx-auto">
          <AnimatedSection>
            <p className="eyebrow mb-4">Advisory Services</p>
            <h2 className="font-serif text-[36px] md:text-[40px] leading-[1.15] mb-3">
              For leaders who want to keep thinking,
              <br />
              not just react.
            </h2>
            <p className="text-muted-foreground text-base italic mb-8">For SMB leaders and executives who want ongoing strategic guidance on cyber risk.</p>
            <div className="max-w-[680px]">
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
                The Cyber Consultant Advisory Retainer is a monthly engagement for SMB leaders who want a trusted strategic partner on human risk — without adding headcount or navigating vendor relationships.
              </p>
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
                Each month includes two 60-minute strategy sessions, async access for time-sensitive questions, a quarterly risk review and recommendation report, and priority access to pre-vetted rates. Engagements begin with a minimum three-month commitment.
              </p>
              <p className="text-[13px] text-muted-foreground italic mb-8">
                Best for: SMB owners and executives who want ongoing strategic guidance on cyber risk without the overhead of an in-house team.
              </p>
            </div>
            <Button variant="gold" asChild>
              <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Discovery Call <ArrowRight size={16} />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 5 — Curriculum Development */}
      <section id="curriculum" className="bg-cream border-t border-gold/20">
        <div className="container-page py-24 md:py-32 max-w-[1000px] mx-auto">
          <AnimatedSection>
            <p className="eyebrow mb-4">Curriculum Development</p>
            <h2 className="font-serif text-[36px] md:text-[40px] leading-[1.15] mb-3">
              For organizations that want to build
              <br />
              something that lasts.
            </h2>
            <p className="text-muted-foreground text-base italic mb-8">
              For workforce development organizations, training providers, community colleges, and corporate learning teams.
            </p>
            <div className="max-w-[680px]">
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
                Lakeidra partners with workforce development organizations, training providers, community colleges, and corporate learning teams to design and deliver cybersecurity curricula that are rigorous, human-centered, and built for the real world.
              </p>
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
                Her expertise in CompTIA certification pathways — including Security+ — and experience designing programs for both corporate and government-funded workforce initiatives means she brings subject matter authority and instructional design skill to every partnership.
              </p>
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
                Curriculum partnerships are scoped individually and may include program design, instructor guides, student materials, assessment frameworks, and live instruction. Intellectual property and licensing structures are established at the outset of every partnership.
              </p>
              <p className="text-[13px] text-muted-foreground italic mb-8">
                Best for: Workforce development organizations, community colleges, government-funded training programs, and corporate L&D teams building internal cyber capability.
              </p>
            </div>
            <Button variant="gold" asChild>
              <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Discovery Call <ArrowRight size={16} />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 6 — The Book (burgundy background) */}
      <section className="bg-burgundy text-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection>
            <p className="eyebrow mb-4">The Book That Started It All</p>
            <h2 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-[1.15] mb-12">Cyber Curiosity</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.1} className="flex justify-center">
              <img
                src={bookCover}
                alt="Cyber Curiosity book by Lakeidra Smith"
                className="max-w-[280px] md:max-w-[320px] w-full drop-shadow-2xl"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-cream/90 text-[17px] leading-[1.7] mb-8">
                <em>Cyber Curiosity</em> is the book Lakeidra wrote for everyone who has ever felt like cybersecurity was someone else's job. It introduces the Cyber Curiosity Mindset — <strong className="text-gold">Pause. Ask. Verify.</strong> — and walks readers through the habits, decisions, and assumptions that quietly shape their digital risk every day. It is the foundation of everything The Cyber Consultant teaches. Available individually or in bulk for workshop and conference use.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="gold" asChild>
                  <a href="https://www.amazon.com/Cyber-Curiosity-Beginners-Cybersecurity-Yourself/dp/1636768695/" target="_blank" rel="noopener noreferrer">
                    Order Individual Copies <ArrowRight size={16} />
                  </a>
                </Button>
                <Button variant="hero-ghost" asChild>
                  <Link to="/contact">Inquire About Bulk Orders</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section 7 — Final CTA */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-[1.15] mb-4">Ready to build something that lasts?</h2>
            <p className="text-cream/70 text-lg mb-10">Every engagement begins with a conversation.</p>
            <Button variant="hero-primary" size="lg" asChild>
              <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                Let's Talk <ArrowRight size={16} />
              </a>
            </Button>
            <p className="text-cream/40 text-sm mt-10">
              hello@the-cyber-consultant.com · the-cyber-consultant.com
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
