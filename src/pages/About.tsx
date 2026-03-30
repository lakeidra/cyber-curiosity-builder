import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";
import lakeidraAbout from "@/assets/lakeidra-about.jpg";

const About = () => {
  return (
    <Layout>
      {/* Section 1 — Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 text-center max-w-[800px] mx-auto">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4">
              Helping Humans Understand Machines.
            </h1>
            <p className="text-cream/70 text-xl">The story behind The Cyber Consultant.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 2 — Origin Story */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <img
              src={lakeidraAbout}
              alt="Lakeidra Smith"
              className="rounded-lg shadow-xl w-full object-cover aspect-[4/3]"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.15] mb-6">
              She's been in the machine since childhood.
            </h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
              Before Lakeidra Smith was a keynote speaker, she was a nine-year-old who broke her Christmas laptop out of curiosity — and fixed it. Before she was a bestselling author, she was a fifteen-year-old charging neighbors for virus removal and website builds, learning by doing what most people are afraid to touch.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
              That technical foundation — built through years of hands-on tinkering before she ever set foot in a classroom — is what makes her different. She doesn't translate cybersecurity into human language because she studied communications. She does it because she has lived on both sides of the screen, and she knows exactly where the gap lives.
            </p>
            <p className="text-foreground font-medium text-[17px]">Today, that gap is her life's work.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 3 — The Conviction */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 max-w-[680px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.15] mb-6">
              A phone call. One sentence. A conviction.
            </h2>
            <p className="text-cream/80 text-[17px] leading-[1.7] mb-6">
              Lakeidra was a college senior — working tech support by day, writing her first book by night — when she called her boss to resign. She was excited. The book was about cybersecurity and the way ordinary people had been left unprotected in a digital world designed to exploit them.
            </p>
            <p className="text-cream/80 text-[17px] leading-[1.7] mb-10">
              Her boss was technical. Experienced. Someone she deeply respected. His response stopped her cold.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <blockquote className="pull-quote py-8 my-10">
              <p className="font-serif text-3xl md:text-[40px] italic leading-[1.2] text-cream">
                "Well, our data is already gone anyway. Who cares."
              </p>
            </blockquote>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-cream/80 text-[17px] leading-[1.7] mb-4">
              That apathy — from someone who knew the systems, understood the threats, and had simply given up — clarified everything. If technically inclined people had resigned themselves to helplessness, what did everyone else have?
            </p>
            <p className="text-cream/80 text-[17px] leading-[1.7]">
              The answer, Lakeidra decided, was a different conversation entirely. Not more software. Not more fear. A framework that treated people as capable of protecting themselves — and gave them the tools to do it. That conviction became <em>Cyber Curiosity</em>. And Cyber Curiosity became The Cyber Consultant.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 4 — Values */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32 max-w-[680px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.15] mb-6">Education is liberation.</h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
              Long before cybersecurity, there was a grandmother. A sharecropper's daughter who earned her master's degree during the civil rights era and taught special education for over 35 years in a community shaped by socioeconomic barriers.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
              She showed Lakeidra — through her own life — that access to knowledge changes what's possible. That belief runs through every program The Cyber Consultant builds, every workshop it delivers, every curriculum it designs.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7]">
              Cybersecurity education has been gatekept for too long — treated as a technical specialty, delivered in a language that excludes the very people who need it most. The Cyber Consultant exists to change that.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 5 — The Company */}
      <section className="bg-cream border-t-2 border-gold/20">
        <div className="container-page py-24 md:py-32 max-w-[680px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl leading-[1.15] mb-6">The Cyber Consultant LLC</h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
              Founded in 2020 by Lakeidra Smith, The Cyber Consultant is a Birmingham-based cybersecurity education and strategic advisory firm serving organizations across the Southeast and beyond.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
              Every engagement is founder-led. Lakeidra personally delivers every keynote, every workshop, every advisory session. There is no junior staff. There is no bait-and-switch. When you work with The Cyber Consultant, you work with Lakeidra.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-12">
              We partner with workforce development organizations, training providers, corporate teams, and conference organizers who need a partner that combines deep subject matter expertise with the rare ability to make that expertise accessible to any audience.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Featured At",
                copy: "Dell Cybersecurity Summit · Sloss Tech · Elevate & Empower Tech Event · EdFarm · Correlation One",
              },
              {
                title: "Clients Served",
                copy: "1,500+ Companies · Startups · SMBs · Nonprofits · Educational Institutions",
              },
              {
                title: "Press",
                copy: "New feature coming soon. Check back for updates.",
              },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.1}>
                <div className="bg-navy text-cream rounded-lg p-8 text-center h-full">
                  <p className="eyebrow mb-3">{card.title}</p>
                  <p className="text-cream/70 text-sm leading-relaxed">{card.copy}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — FACE Tomorrow™ Framework */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection className="text-center mb-16 max-w-[800px] mx-auto">
            <p className="eyebrow mb-4">The Leadership Framework</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-4">
              Leaders who refuse to be blindsided use a different framework.
            </h2>
            <p className="text-cream/70 text-lg">
              FACE Tomorrow™ is the organizational framework Lakeidra brings to executive workshops and board briefings. It is not a checklist. It is a way of leading.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                letter: "F",
                title: "Foresight",
                desc: "See the threat before it becomes a headline. Leaders who build foresight don't wait for their CISO to brief them — they ask the right questions first.",
              },
              {
                letter: "A",
                title: "Alignment",
                desc: "Security is not an IT function. It is a business function. Alignment means every department understands its role in the organization's risk posture.",
              },
              {
                letter: "C",
                title: "Curiosity",
                desc: "The organizations that get breached are often the ones that stopped asking questions. Curiosity is not paranoia — it is leadership.",
              },
              {
                letter: "E",
                title: "Execution",
                desc: "Strategy without action is a document. Execution means your team knows exactly what to do when the moment arrives.",
              },
            ].map((pillar, i) => (
              <AnimatedSection key={pillar.letter} delay={i * 0.1}>
                <div className="bg-navy-light border border-burgundy/30 rounded-lg p-8 h-full">
                  <span className="font-serif text-4xl text-gold">{pillar.letter}</span>
                  <h3 className="font-serif text-xl mb-3 mt-2">{pillar.title}</h3>
                  <p className="text-cream/70 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.5}>
            <p className="text-center text-cream/40 text-xs italic mt-10 font-sans">
              FACE Tomorrow™ is a registered framework of The Cyber Consultant LLC.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 7 — CTA */}
      <section className="bg-navy text-cream border-t border-navy-light">
        <div className="container-page py-24 md:py-32 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">Let's build something together.</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero-primary" size="lg" asChild>
                <Link to="/contact">Get in Touch <ArrowRight size={16} /></Link>
              </Button>
              <Button variant="hero-ghost" size="lg" asChild>
                <Link to="/services">See Our Services</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
