import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, BookOpen, Mic, Users, GraduationCap, Briefcase } from "lucide-react";

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20 md:py-28 text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">What We Do</h1>
            <p className="text-gold text-lg font-medium mb-6">Cybersecurity is not a technology problem. It is a human one.</p>
            <p className="text-cream/70 leading-relaxed">
              At The Cyber Consultant, we help individuals, teams, and organizations build the habits, mindset, and culture that technology alone can never provide. Our work is rooted in one philosophy: Cyber Curiosity — the practice of pausing, asking the right questions, and verifying before you act.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service 1: Keynote */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <Mic className="text-gold" size={24} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Keynote &amp; Speaking</h2>
            </div>
            <p className="text-gold font-medium mb-4">The talk your audience will still be thinking about on Monday.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Lakeidra brings a rare combination to the stage: hands-on technical roots going back to childhood, the credibility of a published cybersecurity author, and the warmth of a storyteller who genuinely believes her audience is capable of protecting themselves. She doesn't lecture — she shifts perspectives.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Her signature talk, <em>The Cyber Curiosity Mindset</em>, is available as a keynote, breakout session, or conference closing. Audiences leave with one clear mindset shift and a framework they can use before they even get back to their desks.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Lakeidra has spoken at the Dell Cybersecurity Summit, Sloss Tech, Elevate and Empower Tech Event, EdFarm, and Correlation One.
            </p>
            <p className="text-sm text-muted-foreground"><strong>Best for:</strong> Conferences, corporate all-hands, leadership summits, and professional associations.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service 2: Workshops */}
      <section id="workshops" className="bg-cream-dark">
        <div className="container-page py-20 md:py-24 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <Users className="text-gold" size={24} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Workshops &amp; Team Training</h2>
            </div>
            <p className="text-gold font-medium mb-4">Your team doesn't need another compliance training. They need a practice.</p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our workshops are built around real scenarios, not slides full of statistics. Participants learn to recognize threats by developing the same instinct Lakeidra teaches in her book: pause, ask, verify.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {[
              {
                title: "The Spark Session",
                desc: "A 90-minute interactive experience for teams of up to 50. Fast, focused, and immediately actionable. Perfect as a lunch-and-learn or team meeting. Available virtually or in-person.",
                price: "Starting at $3,500 virtual / $5,000 in-person",
              },
              {
                title: "The Cyber Curiosity Workshop",
                desc: "A half-day experience for teams of up to 75. The full Cyber Curiosity methodology — habit assessment, scenario simulations, and a personalized action plan for your organization. Each participant receives a copy of Cyber Curiosity.",
                price: "Starting at $7,500 virtual / $10,000 in-person",
              },
              {
                title: "The Executive Cyber Briefing",
                desc: "A focused 60-minute strategic session for leadership teams of 10–20. Not a training — a risk conversation in the language executives speak: business continuity, liability, and decision-making. Ends with three tailored recommendations.",
                price: "Starting at $5,000 virtual / $7,500 in-person",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="bg-cream rounded-xl p-6 border border-border">
                  <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{item.desc}</p>
                  <p className="text-gold font-semibold text-sm">{item.price}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <p className="text-sm text-muted-foreground mt-8">
              <strong>Best for:</strong> SMBs, corporate teams, HR and L&D initiatives, leadership retreats, and company off-sites. Lakeidra has delivered workshops for F500 companies, startups, nonprofits, and educational institutions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service 3: Curriculum */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <GraduationCap className="text-gold" size={24} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Curriculum Development &amp; Partnerships</h2>
            </div>
            <p className="text-gold font-medium mb-4">For organizations that want to build something that lasts.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Lakeidra partners with workforce development organizations, training providers, community colleges, and corporate learning teams to design and deliver cybersecurity curricula that are rigorous, human-centered, and built for the real world.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With expertise in CompTIA certification pathways — including Security+ — and experience designing programs for both corporate and government-funded workforce initiatives, Lakeidra brings subject matter authority and instructional design skill to every partnership.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Curriculum partnerships are scoped individually and may include program design, instructor guides, student materials, assessment frameworks, and live instruction. Intellectual property and licensing structures are established at the outset of every partnership.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Best for:</strong> Workforce development organizations, community colleges, government-funded training programs, and corporate L&D teams building internal cyber capability.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service 4: Advisory */}
      <section className="bg-cream-dark">
        <div className="container-page py-20 md:py-24 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <Briefcase className="text-gold" size={24} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Advisory Services</h2>
            </div>
            <p className="text-gold font-medium mb-4">For leaders who want to keep thinking, not just react.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Cyber Curiosity Advisory Retainer is a monthly engagement for SMB leaders who want a trusted strategic partner on human cyber risk — without adding headcount or navigating vendor relationships.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each month includes two 60-minute strategy sessions, async access for time-sensitive questions, a quarterly risk review and recommendation report, and priority access to workshops at preferred rates. Engagements begin with a minimum three-month commitment.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Best for:</strong> SMB owners and executives who want ongoing strategic guidance on cyber risk without the overhead of an in-house team.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Service 5: Book */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                <BookOpen className="text-gold" size={24} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl">Cyber Curiosity — The Book</h2>
            </div>
            <p className="text-gold font-medium mb-4">Start here. Everything else builds from this.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <em>Cyber Curiosity</em> is the book Lakeidra wrote for everyone who has ever felt like cybersecurity was someone else's job. It introduces the Cyber Curiosity Mindset — Pause. Ask. Verify. — and walks readers through the habits, decisions, and assumptions that quietly shape their digital risk every day. It is the foundation of everything The Cyber Consultant teaches. Available individually or in bulk for workshop and conference use.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="gold" asChild>
                <a href="https://www.amazon.com/Cyber-Curiosity-Beginners-Cybersecurity-Yourself/dp/1636768695/" target="_blank" rel="noopener noreferrer">Order Individual Copies <ArrowRight size={16} /></a>
              </Button>
              <Button variant="gold-outline" asChild>
                <Link to="/contact">Inquire About Bulk Orders <ArrowRight size={16} /></Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20 md:py-24 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready to build something that lasts?</h2>
            <p className="text-cream/70 text-lg mb-8">Every engagement begins with a conversation.</p>
            <Button variant="hero-primary" size="lg" asChild>
              <Link to="/contact">Let's Talk</Link>
            </Button>
            <p className="text-cream/50 text-sm mt-8">
              hello@the-cyber-consultant.com · the-cyber-consultant.com
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
