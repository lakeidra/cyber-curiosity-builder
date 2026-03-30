import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";
import lakeidraHero from "@/assets/lakeidra-smith.jpg";
import lakeidraAbout from "@/assets/lakeidra-about.jpg";
import bookCover from "@/assets/cyber-curiosity-book.png";

const asSeenIn = [
  "Dell Cybersecurity Summit",
  "Sloss Tech",
  "Blossoming Technologist",
  "All In Podcast",
  "Tennessee Highlighter",
];

const stats = [
  { number: "5,000+", label: "Learners Trained" },
  { number: "92", label: "NPS Score (up from 27)" },
  { number: "50%+", label: "Certification Pass Rate (up from sub-20%)" },
];

const testimonials = [
  {
    quote: "Lakeidra has an extraordinary ability to take complex cybersecurity concepts and make them accessible to any audience. Our team left her workshop with actionable habits they still use months later.",
    name: "Workshop Client",
    title: "Corporate L&D Director",
  },
  {
    quote: "She doesn't just inform — she transforms how people think about their role in security. Our leadership team finally understands that cybersecurity is a business function, not just an IT one.",
    name: "Executive Briefing Client",
    title: "CEO, Mid-Market Company",
  },
  {
    quote: "The Cyber Curiosity framework gave our workforce development program the structure and credibility it needed. Lakeidra's curriculum design expertise is unmatched.",
    name: "Curriculum Partner",
    title: "Workforce Development Director",
  },
];

const services = [
  {
    title: "Keynote & Speaking",
    desc: "For conferences, corporate events, and leadership summits. Lakeidra brings a rare combination to the stage: deep technical roots and the storytelling instinct of a published author.",
    link: "/services",
    cta: "See Speaking →",
  },
  {
    title: "Workshops & Training",
    desc: "Your team doesn't need another compliance training. They need a repeatable instinct. Half-day and full-day sessions built around real scenarios, not slides full of statistics.",
    link: "/services#workshops",
    cta: "See Workshops →",
  },
  {
    title: "Advisory Services",
    desc: "For leaders who want to keep thinking, not just react. Monthly strategic guidance on human risk, AI governance, and security culture — without adding headcount.",
    link: "/services#advisory",
    cta: "See Advisory →",
  },
  {
    title: "Curriculum Development",
    desc: "For organizations that want to build something that lasts. Lakeidra has designed curriculum for Amazon and the U.S. Department of Defense. She brings that rigor to your program.",
    link: "/services#curriculum",
    cta: "See Curriculum →",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Section 1 — Hero */}
      <section className="bg-navy text-cream relative overflow-hidden">
        <div className="container-page py-24 md:py-32 lg:py-40 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <p className="eyebrow mb-6">The Cyber Consultant</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] mb-6">
              The boardroom is the new frontline.
              <br />
              <em className="text-gold">Is your leadership ready?</em>
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed mb-10 max-w-[560px]">
              Most cybersecurity training teaches people what to fear. Lakeidra Smith teaches them what to do — and why it matters before the incident, not after.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero-primary" size="lg" asChild>
                <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                  Schedule a Discovery Call
                </a>
              </Button>
              <Button variant="hero-ghost" size="lg" asChild>
                <a href="#curiosity-brief">Read The Curiosity Brief</a>
              </Button>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="flex justify-center md:justify-end">
            <div className="relative">
              <img
                src={lakeidraHero}
                alt="Lakeidra Smith, Founder of The Cyber Consultant"
                className="rounded-lg shadow-2xl max-w-[320px] md:max-w-[380px] w-full object-cover aspect-[3/4]"
                style={{ filter: "brightness(0.95) saturate(0.9)" }}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 2 — As Seen In */}
      <section className="bg-cream border-b border-gold/20">
        <div className="container-page py-8">
          <p className="eyebrow text-center mb-6 text-muted-foreground">As Seen In</p>
          {/* Desktop: static row */}
          <div className="hidden md:flex items-center justify-center gap-0">
            {asSeenIn.map((name, i) => (
              <span key={name} className="flex items-center">
                <span className="text-foreground font-medium text-sm tracking-wide">{name}</span>
                {i < asSeenIn.length - 1 && (
                  <span className="mx-4 h-4 w-px bg-gold/40 inline-block" />
                )}
              </span>
            ))}
          </div>
          {/* Mobile: marquee */}
          <div className="md:hidden overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...asSeenIn, ...asSeenIn].map((name, i) => (
                <span key={i} className="flex items-center mx-4">
                  <span className="text-foreground font-medium text-sm">{name}</span>
                  <span className="ml-4 h-4 w-px bg-gold/40 inline-block" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Positioning Statement */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection>
            <p className="eyebrow text-center mb-6">What Makes This Different</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-center leading-[1.15] mb-12 max-w-[800px] mx-auto">
              Most cyber firms talk to your IT team.
              <br />
              We talk to the people who lead it.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[680px] md:max-w-none mx-auto mb-16">
            <AnimatedSection delay={0.1}>
              <p className="text-muted-foreground text-[17px] leading-[1.7]">
                Cybersecurity is not a technology problem. It is a human one. Nineteen out of twenty breaches begin with a person — a click, a trust, a moment of not knowing what to look for. Technology cannot fix that. A different kind of conversation can.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-muted-foreground text-[17px] leading-[1.7]">
                The Cyber Consultant exists at the intersection of security expertise and executive communication. We translate. We train. We build the instincts your organization needs to make better decisions — starting with the humans at the top.
              </p>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-navy text-cream rounded-lg p-8 text-center">
                  <p className="font-serif text-3xl md:text-4xl text-gold mb-2">{stat.number}</p>
                  <p className="text-cream/70 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 4 — Credibility Anchor / Book */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection>
            <p className="eyebrow mb-6">Bestselling Author</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12">The book that started a movement.</h2>
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
              <p className="text-cream/80 text-[17px] leading-[1.7] mb-6">
                <em>Cyber Curiosity: A Beginner's Guide to Cybersecurity</em> was written for every person who ever felt like cybersecurity was someone else's job. It introduces the framework — <strong className="text-gold">Pause. Ask. Verify.</strong> — that sits at the foundation of everything The Cyber Consultant teaches.
              </p>
              <p className="text-cream/80 text-[17px] leading-[1.7] mb-8">
                It is not a technical manual. It is a mindset shift. Written in the language your employees actually speak.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.amazon.com/Cyber-Curiosity-Beginners-Cybersecurity-Yourself/dp/1636768695/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Get the Book <ArrowRight size={16} />
                </a>
                <Button variant="hero-ghost" size="default" asChild>
                  <Link to="/contact">Inquire About Bulk Orders</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section 5 — Meet Lakeidra */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img
                src={lakeidraAbout}
                alt="Lakeidra Smith"
                className="rounded-lg shadow-xl w-full object-cover aspect-[4/3]"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="eyebrow mb-4">Your Strategic Partner</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">She's been in the machine since childhood.</h2>
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
                Before Lakeidra Smith was a keynote speaker, she was a nine-year-old who broke her Christmas laptop out of curiosity — and fixed it. Before she was a bestselling author, she was a fifteen-year-old charging neighbors for virus removal and website builds.
              </p>
              <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
                That foundation — built through hands-on experience before she ever set foot in a classroom — is what makes her different. She doesn't translate cybersecurity into human language because she studied communications. She does it because she has lived on both sides of the screen, and she knows exactly where the gap lives.
              </p>
              <p className="text-foreground font-medium text-[17px] mb-6">Today, that gap is her life's work.</p>
              <Button variant="gold-outline" asChild>
                <Link to="/about">Read Lakeidra's Full Story <ArrowRight size={16} /></Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section 6 — The Cyber Curiosity Mindset */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection className="text-center mb-16">
            <p className="eyebrow mb-4">The Framework</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 max-w-[800px] mx-auto">
              Simple enough to remember. Powerful enough to prevent a $25 million fraud.
            </h2>
            <p className="text-cream/70 text-lg max-w-[680px] mx-auto">
              Every program, workshop, and keynote The Cyber Consultant delivers is rooted in one framework.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "PAUSE",
                copy: "Before you click, transfer, share, or act — stop. One breath interrupts the reflex that attackers depend on.",
              },
              {
                title: "ASK",
                copy: "What feels off? What can't I verify? Curiosity is not paranoia. It is professionalism.",
              },
              {
                title: "VERIFY",
                copy: "Through a second channel. Every time. Real urgency can wait two minutes. False urgency cannot.",
              },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.15}>
                <div className="bg-navy-light rounded-lg p-8 text-center h-full border border-gold/20">
                  <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-gold font-serif text-2xl">{card.title[0]}</span>
                  </div>
                  <h3 className="font-serif text-2xl mb-3 text-gold">{card.title}</h3>
                  <p className="text-cream/70 leading-relaxed">{card.copy}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.5}>
            <p className="text-center text-cream/50 text-sm italic mt-10 font-sans">
              Pause. Ask. Verify. is the core of the Cyber Curiosity Mindset — the behavioral framework from Lakeidra's bestselling book.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 7 — Services Preview */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection className="text-center mb-16">
            <p className="eyebrow mb-4">How We Work Together</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">From the keynote to the boardroom.</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((svc, i) => (
              <AnimatedSection key={svc.title} delay={i * 0.1}>
                <div className="bg-background rounded-lg p-8 h-full border border-gold/20 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-serif text-2xl mb-3">{svc.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{svc.desc}</p>
                  <Link
                    to={svc.link}
                    className="text-gold font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all text-sm"
                  >
                    {svc.cta}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 — Testimonials */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection>
            <p className="eyebrow mb-6">What Clients Say</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-cream text-foreground rounded-lg p-8 h-full border-l-4 border-burgundy">
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <p className="text-gold font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.title}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9 — The Curiosity Brief CTA */}
      <section id="curiosity-brief" className="bg-burgundy text-cream">
        <div className="container-page py-24 md:py-32 text-center max-w-[680px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
              Stay ahead of the threat — and the conversation.
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed mb-10">
              The Curiosity Brief is a newsletter for leaders who want to think clearly about cybersecurity — without wading through technical noise. Practical. Human. Written by Lakeidra every time.
            </p>
            <Button variant="burgundy" size="lg" asChild>
              <a href="#curiosity-brief-subscribe">Subscribe to The Curiosity Brief <ArrowRight size={16} /></a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 10 — Final CTA */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">Ready to build something that lasts?</h2>
            <p className="text-cream/70 text-lg mb-10">Every engagement begins with a conversation.</p>
            <Button variant="hero-primary" size="lg" asChild>
              <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Discovery Call <ArrowRight size={16} />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
