import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";
import lakeidraPhoto from "@/assets/lakeidra-about.jpg";
import bookCover from "@/assets/cyber-curiosity-book.png";

const pillars = [
  {
    name: "Advise",
    desc: "Strategic guidance that translates technical reality into decisions leaders can actually make. Foresight audits, advisory retainers, board briefings, and program management.",
  },
  {
    name: "Educate",
    desc: "Training that changes behavior instead of checking boxes. Workshops, tabletop exercises, and curriculum delivered at national scale.",
  },
  {
    name: "Build",
    desc: "Durable capability your organization owns after we leave. Custom curriculum, licensed frameworks, and our proprietary nsite diagnostic platform.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32 text-center max-w-[840px] mx-auto">
          <AnimatedSection>
            <p className="eyebrow mb-6">About The Cyber Consultant</p>
            <h1 className="font-serif text-[40px] md:text-5xl lg:text-[4.5rem] leading-[1.1] mb-6">
              We exist because technology
              <br />
              <em className="text-gold">outran understanding.</em>
            </h1>
            <p className="text-cream/70 text-lg leading-relaxed max-w-[680px] mx-auto">
              The Cyber Consultant, LLC is a foresight strategy and AI risk advisory firm headquartered in Birmingham, Alabama. We serve enterprise leaders and government agencies with one shared mission: helping humans understand machines.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* The problem we solve */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-32 max-w-[860px]">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">Why We Exist</p>
            <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.15] mb-6">
              The Translation Gap is the most expensive problem nobody budgets for.
            </h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
              In every organization we've worked with, the same structural problem shows up: the people who understand the technology and the people accountable for the decisions are speaking two different languages. Technical teams brief. Leaders nod. Nothing translates. Then the AI rollout stalls, the security incident lands, or the modernization project runs over, and everyone wonders what went wrong.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
              What went wrong is the gap. We named it, we measure it, and we've built an entire firm around closing it.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7]">
              That's why our work spans both the boardroom and the workforce, both the enterprise and the agency. The gap doesn't care about your org chart or your sector. Neither do we.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* The model */}
      <section className="bg-background">
        <div className="container-page py-24 md:py-28">
          <AnimatedSection>
            <p className="eyebrow text-center mb-4 text-gold-dark">How We Work</p>
            <h2 className="font-serif text-[30px] md:text-[42px] leading-[1.15] text-center mb-14">
              Advise. Educate. Build.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.08}>
                <div className="bg-cream rounded-lg p-8 h-full border border-gold/20 text-center">
                  <span className="block h-[2px] w-8 bg-gold mx-auto mb-5" aria-hidden="true" />
                  <h3 className="font-serif text-[26px] mb-4">{p.name}</h3>
                  <p className="text-muted-foreground text-[15px] leading-[1.7]">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="bg-navy text-cream">
        <div className="container-page py-24 md:py-32">
          <AnimatedSection>
            <p className="eyebrow mb-4">Meet the Team</p>
            <h2 className="font-serif text-[32px] md:text-[44px] leading-[1.15] mb-14 max-w-[720px]">
              Small by design. Senior by default.
            </h2>
          </AnimatedSection>

          {/* Founder */}
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-start mb-12 border border-gold/30 rounded-lg p-8 md:p-12 bg-navy-light">
              <img
                src={lakeidraPhoto}
                alt="Lakeidra Smith, Founder & CEO of The Cyber Consultant"
                className="rounded-lg w-full max-w-[320px] object-cover aspect-[3/4] mx-auto lg:mx-0"
              />
              <div>
                <h3 className="font-serif text-[28px] md:text-[32px] mb-1">Lakeidra Smith</h3>
                <p className="text-gold text-sm font-semibold mb-5 uppercase tracking-wider">Founder & CEO</p>
                <p className="text-cream/75 text-[16px] leading-[1.7] mb-4">
                  Lakeidra is a foresight strategist, cybersecurity educator, and the bestselling author of Cyber Curiosity: A Beginner's Guide to Cybersecurity. Before founding TCC, she built and scaled a national cybersecurity training program serving more than 5,000 learners, including Department of Defense cohorts, taking its NPS from 22 to 79 and more than doubling certification pass rates.
                </p>
                <p className="text-cream/75 text-[16px] leading-[1.7] mb-6">
                  She created the FACE Tomorrow™ methodology and the nsite diagnostic platform, holds CompTIA Security+, serves on the WiCyS Central Alabama Advisory Board, and speaks nationally on AI readiness and the translation gap. Her full story, book, and speaking work live on her personal site.
                </p>
                <Button variant="hero-primary" asChild>
                  <a href="https://lakeidra.com" target="_blank" rel="noopener noreferrer">
                    Visit lakeidra.com <ArrowRight className="ml-1" size={16} />
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Team members */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.08}>
              <div className="border border-gold/30 rounded-lg p-8 bg-navy-light h-full">
                <h3 className="font-serif text-[24px] mb-1">Jonathan Clark</h3>
                <p className="text-gold text-sm font-semibold mb-4 uppercase tracking-wider">Technical Lead</p>
                <p className="text-cream/75 text-[15px] leading-[1.7]">
                  Jonathan anchors TCC's technical delivery capability across cybersecurity, cloud, and IT modernization. His enterprise and defense background powers the firm's contract-scale delivery work, from Zero Trust architecture to large-scale migration programs.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.16}>
              <div className="border border-gold/30 rounded-lg p-8 bg-navy-light h-full flex flex-col justify-center">
                <h3 className="font-serif text-[24px] mb-3">A vetted partner network</h3>
                <p className="text-cream/75 text-[15px] leading-[1.7]">
                  Beyond our core team, TCC delivers through an established network of cleared, credentialed professionals, letting us staff to contract requirements on award without compromising on seniority or quality.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Credentials & the book */}
      <section className="bg-cream">
        <div className="container-page py-24 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <p className="eyebrow mb-4 text-gold-dark">Credentials & Roots</p>
            <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.15] mb-6">
              A certified woman-owned firm with a published point of view.
            </h2>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-4">
              TCC is a certified Woman-Owned Small Business (WOSB) and Economically Disadvantaged Woman-Owned Small Business (EDWOSB), performing as prime and subcontractor for federal, state, and local government.
            </p>
            <p className="text-muted-foreground text-[17px] leading-[1.7] mb-8">
              Our approach isn't a pitch deck invention. It's documented in Cyber Curiosity, our founder's bestselling book, and refined through years of teaching thousands of people to stop fearing technology and start questioning it.
            </p>
            <Button variant="outline" className="border-navy/30 hover:bg-navy hover:text-cream" asChild>
              <Link to="/government">See Government Credentials</Link>
            </Button>
          </AnimatedSection>
          <AnimatedSection delay={0.15} className="flex justify-center">
            <img
              src={bookCover}
              alt="Cyber Curiosity: A Beginner's Guide to Cybersecurity, by Lakeidra Smith"
              className="max-w-[260px] w-full rounded-lg shadow-2xl"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20 md:py-24 text-center max-w-[680px] mx-auto">
          <AnimatedSection>
            <h2 className="font-serif text-[28px] md:text-[40px] leading-[1.15] mb-4">
              Work with a firm that speaks both languages.
            </h2>
            <p className="text-cream/70 text-[16px] leading-[1.7] mb-8">
              Enterprise or agency, boardroom or workforce, the first step is the same.
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

export default About;
