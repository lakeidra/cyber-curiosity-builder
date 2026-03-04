import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import lakeidraAbout from "@/assets/lakeidra-about.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20 md:py-28 text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Helping Humans Understand Machines</h1>
            <p className="text-cream/70 text-xl">The story behind The Cyber Consultant.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Technical Origin */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <img src={lakeidraAbout} alt="Lakeidra Smith" className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]" />
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">She's been in the machine since childhood.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Before Lakeidra Smith was a cybersecurity educator, she was a nine-year-old who broke her Christmas laptop out of curiosity — and fixed it the same way. Before she was a keynote speaker, she was a fifteen-year-old charging neighbors for virus removal and website builds, learning by doing what most people are afraid to touch.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              That technical foundation — built through years of hands-on tinkering before she ever set foot in a classroom — is what makes her different. She doesn't translate cybersecurity into human language because she studied communications. She does it because she has lived on both sides of the screen, and she knows exactly where the gap lives.
            </p>
            <p className="text-foreground font-medium">Today that gap is her life's work.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* The Moment */}
      <section className="bg-cream-dark">
        <div className="container-page py-20 md:py-24 max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">A phone call. One sentence. A conviction.</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Lakeidra was a college senior — working tech support by day, writing her first book by night — when she called her boss to resign. She was excited. The book was about cybersecurity and the way ordinary people had been left unprotected in a digital world designed to exploit them.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Her boss was technical. Experienced. Someone she deeply respected. His response stopped her cold.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <blockquote className="bg-navy text-cream rounded-xl p-8 text-center my-8">
              <p className="font-serif text-2xl md:text-3xl italic">
                "Well, our data is already gone anyway. Who cares."
              </p>
            </blockquote>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-muted-foreground leading-relaxed mb-4">
              That apathy — from someone who knew the systems, understood the threats, and had simply given up — clarified everything. If technically inclined people had resigned themselves to helplessness, what did everyone else have?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The answer, Lakeidra decided, was a different conversation entirely. Not more software. Not more fear. A framework that treated people as capable of protecting themselves — and gave them the tools to do it. That conviction became <em>Cyber Curiosity</em>. And Cyber Curiosity became The Cyber Consultant.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Deeper Why */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24 max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Education is liberation.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Long before cybersecurity, there was a grandmother. A sharecropper's daughter who earned her master's degree during the civil rights era and taught special education for over 35 years in a community shaped by socioeconomic barriers.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              She showed Lakeidra — through her own life — that access to knowledge changes what's possible. That belief runs through every program The Cyber Consultant builds, every workshop it delivers, every curriculum it designs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Cybersecurity education has been gatekept for too long — treated as a technical specialty, delivered in a language that excludes the very people who need it most. The Cyber Consultant exists to change that.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* The Company */}
      <section className="bg-cream-dark">
        <div className="container-page py-20 md:py-24 max-w-3xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">The Cyber Consultant LLC</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2020 by Lakeidra Smith, The Cyber Consultant is a Birmingham-based cybersecurity education and curriculum consultancy serving organizations across the Southeast and beyond.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We work with workforce development organizations, training providers, community colleges, corporate teams, and conference organizers who need a partner that combines deep subject matter expertise with the rare ability to make that expertise accessible to any audience. Every engagement is built on the Cyber Curiosity framework — <strong>Pause. Ask. Verify.</strong> — and shaped around the real humans doing the work, not just the systems they operate.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-cream">
        <div className="container-page py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "FEATURED AT", copy: "Dell Cybersecurity Summit · Sloss Tech · Elevate & Empower Tech Event · EdFarm · Correlation One" },
              { title: "CLIENTS SERVED", copy: "F500 Companies · Startups · SMBs · Nonprofits · Educational Institutions" },
              { title: "PRESS", copy: "Press features coming soon. Check back for updates." },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.1}>
                <div className="bg-cream-dark rounded-xl p-8 text-center border border-border h-full">
                  <p className="text-xs uppercase tracking-widest font-semibold text-gold mb-3">{card.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.copy}</p>
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
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Let's build something together.</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero-primary" size="lg" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
              <Button variant="hero-secondary" size="lg" asChild>
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
