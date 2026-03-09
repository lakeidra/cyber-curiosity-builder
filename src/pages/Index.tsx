import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Pause, Search, ShieldCheck, ArrowRight, BookOpen } from "lucide-react";
import lakeidraHero from "@/assets/lakeidra-smith.jpg";
import lakeidraAbout from "@/assets/lakeidra-about.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream relative overflow-hidden">
        <div className="container-page py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Your people are your greatest security asset.{" "}
              <span className="text-gold">They're also your greatest risk.</span>
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed mb-8 max-w-xl">
              The Cyber Consultant partners with workforce development organizations, training providers, and corporate teams to build the cybersecurity mindset, curriculum, and culture that technology alone can never provide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero-primary" size="lg" asChild>
                <a href="https://the-cyber-consultant.com/scorecard">Access Your Board Readiness</a>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
                <Link to="/services#workshops">Book a Workshop</Link>
              </Button>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="flex justify-center md:justify-end">
            <img
              src={lakeidraHero}
              alt="Lakeidra Smith, Founder of The Cyber Consultant"
              className="rounded-2xl shadow-2xl max-w-sm w-full object-cover aspect-[3/4]"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground mb-6">
              Most cybersecurity training teaches people what to fear.
              <br />
              <span className="text-gold font-serif">We teach people what to do.</span>
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Rooted in the Cyber Curiosity framework — <strong>Pause. Ask. Verify.</strong> — our work changes behavior, not just awareness. We don't create compliance. We build instinct.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="bg-cream-dark">
        <div className="container-page py-20 md:py-24">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">Who We Work With</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-cream rounded-xl p-8 h-full border border-border shadow-sm">
                <h3 className="font-serif text-2xl mb-4">Workforce Development &amp; Training Partners</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the infrastructure and the client pipeline. We bring the subject matter expertise, curriculum design, and the credibility of a published author with deep technical roots. Together, we build programs your learners complete and your organization is proud to deliver.
                </p>
                <p className="text-sm font-semibold mb-1">What we deliver:</p>
                <ul className="text-muted-foreground text-sm mb-6 space-y-1">
                  <li>• CompTIA Security+ bootcamps</li>
                  <li>• Government-funded workforce programs</li>
                  <li>• Community college partnerships</li>
                </ul>
                <Link to="/services" className="text-gold font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all text-sm">
                  Explore curriculum partnerships <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-cream rounded-xl p-8 h-full border border-border shadow-sm">
                <h3 className="font-serif text-2xl mb-4">Corporate Teams &amp; Organizations</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your team doesn't need another compliance training they'll forget by Friday. They need a practice — a repeatable habit that makes them your first line of defense, not your weakest link.
                </p>
                <p className="text-sm font-semibold mb-1">What we offer:</p>
                <ul className="text-muted-foreground text-sm mb-6 space-y-1">
                  <li>• Keynotes</li>
                  <li>• Workshops</li>
                  <li>• Executive briefings</li>
                  <li>• Advisory retainers</li>
                </ul>
                <Link to="/services" className="text-gold font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all text-sm">
                  See workshops &amp; speaking <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Cyber Curiosity Framework */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">The Cyber Curiosity Mindset</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              The framework behind every program, workshop, and keynote we deliver. Simple enough to remember. Powerful enough to prevent a $25 million fraud.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Pause,
                title: "PAUSE",
                copy: "Before you click, transfer, share, or act — stop. One breath interrupts the reflex that attackers depend on.",
              },
              {
                icon: Search,
                title: "ASK",
                copy: "What feels off? What can't I verify? Curiosity is not paranoia. It is professionalism.",
              },
              {
                icon: ShieldCheck,
                title: "VERIFY",
                copy: "Through a second channel. Every time. Real urgency can wait two minutes. Fake urgency cannot.",
              },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.15}>
                <div className="bg-navy text-cream rounded-xl p-8 text-center h-full">
                  <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-5">
                    <card.icon className="text-gold" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl mb-3 text-gold">{card.title}</h3>
                  <p className="text-cream/80 leading-relaxed">{card.copy}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Strip */}
      <section className="bg-cream-dark border-y border-border">
        <div className="container-page py-12 text-center">
          <AnimatedSection>
            <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground mb-4">Featured At &amp; Built For</p>
            <p className="text-foreground font-medium">
              Dell Cybersecurity Summit · Sloss Tech · Elevate &amp; Empower Tech Event · EdFarm · Correlation One
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              F500 Companies · Startups · SMBs · Nonprofits · Educational Institutions
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* About Snippet */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <img
              src={lakeidraAbout}
              alt="Lakeidra Smith speaking at an event"
              className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Meet Lakeidra Smith</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founder of The Cyber Consultant. Author of <em>Cyber Curiosity</em>. Keynote speaker. Curriculum designer. And someone who has been building and securing systems since childhood — which is exactly why she knows the human side of cybersecurity matters more than any software ever will.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Lakeidra started The Cyber Consultant in 2020 with a conviction: that cybersecurity education was failing ordinary people by speaking a language only experts could understand. She set out to change that — and wrote the book on it.
            </p>
            <Button variant="gold-outline" asChild>
              <Link to="/about">Read Lakeidra's full story <ArrowRight size={16} /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Book Feature */}
      <section className="bg-cream-dark">
        <div className="container-page py-20 md:py-24">
          <AnimatedSection>
            <div className="bg-navy text-cream rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <p className="text-sm uppercase tracking-widest text-gold mb-4">The book that started it all</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Cyber Curiosity</h2>
              <p className="text-cream/80 leading-relaxed mb-6 max-w-xl mx-auto">
                Written for every person who has ever felt like cybersecurity was someone else's job. The foundation of every program The Cyber Consultant delivers.
              </p>
              <Button variant="hero-primary" asChild>
                <a href="https://www.amazon.com/Cyber-Curiosity-Beginners-Cybersecurity-Yourself/dp/1636768695/" target="_blank" rel="noopener noreferrer">
                  <BookOpen size={18} /> Get the Book
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl">What People Are Saying</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Lakeidra made cybersecurity feel accessible and actionable. Our team left the workshop with habits they still use today.", name: "Director of Operations", org: "Fortune 500 Company" },
              { quote: "She doesn't lecture — she connects. Our staff finally understood why cybersecurity is their responsibility too.", name: "VP of Learning & Development", org: "Regional Nonprofit" },
              { quote: "The Cyber Curiosity framework changed how our entire organization thinks about digital risk. Simple, memorable, powerful.", name: "Executive Director", org: "Workforce Development Org" },
            ].map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-cream-dark rounded-xl p-6 border border-border h-full flex flex-col">
                  <p className="text-foreground leading-relaxed italic flex-1 mb-4">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-sm">{t.org}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
              hello@the-cyber-consultant.com · the-cyber-consultant.com · Birmingham, AL
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
