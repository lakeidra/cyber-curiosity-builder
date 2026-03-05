import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Mail, MapPin, Globe, Calendar, BookOpen } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    const scriptSrc = "https://tally.so/widgets/embed.js";
    if (document.querySelector(`script[src="${scriptSrc}"]`)) {
      if (typeof (window as any).Tally !== "undefined") {
        (window as any).Tally.loadEmbeds();
      }
      return;
    }
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.onload = () => {
      if (typeof (window as any).Tally !== "undefined") {
        (window as any).Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20 md:py-28 text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Let's Talk</h1>
            <p className="text-cream/70 text-xl">Every engagement begins with a conversation. Tell us what you're building.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Discovery Call */}
      <section className="bg-cream">
        <div className="container-page py-12">
          <AnimatedSection>
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-6 md:p-8 text-center max-w-2xl mx-auto">
              <Calendar className="text-gold mx-auto mb-3" size={32} />
              <h2 className="font-serif text-2xl mb-2">Ready to schedule a discovery call?</h2>
              <p className="text-muted-foreground mb-4">Click below to view availability and book a time that works for you.</p>
              <Button variant="gold" size="lg" asChild>
                <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                  Schedule Your Discovery Call
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tally Form + Info */}
      <section className="bg-cream">
        <div className="container-page py-12 pb-20 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Tally Form */}
            <AnimatedSection className="md:col-span-2">
              <iframe
                data-tally-src="https://tally.so/embed/VLZxR6?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="1180"
                frameBorder="0"
                title="Contact The Cyber Consultant"
                className="w-full"
              />
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.15}>
              <div className="bg-cream-dark rounded-xl p-6 border border-border space-y-6">
                <div>
                  <h3 className="font-serif text-xl mb-3">Direct Contact</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                      <a href="mailto:hello@the-cyber-consultant.com" className="hover:text-gold transition-colors">
                        hello@the-cyber-consultant.com
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                      <span>Birmingham, Alabama</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe size={16} className="text-gold mt-0.5 shrink-0" />
                      <a href="https://the-cyber-consultant.com" className="hover:text-gold transition-colors">
                        the-cyber-consultant.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold text-sm mb-2">Or schedule directly</h4>
                  <Button variant="gold-outline" size="sm" className="w-full" asChild>
                    <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                      <Calendar size={14} /> Book a Discovery Call
                    </a>
                  </Button>
                </div>
                <div className="border-t border-border pt-4">
                  <Button variant="gold-outline" size="sm" className="w-full" asChild>
                    <a href="https://www.amazon.com/Cyber-Curiosity-Beginners-Cybersecurity-Yourself/dp/1636768695/" target="_blank" rel="noopener noreferrer">
                      <BookOpen size={14} /> Get the Book
                    </a>
                  </Button>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground">
                    We typically respond within 24 business hours. For time-sensitive inquiries, you can also reach out via LinkedIn.
                  </p>
                </div>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                <p>Looking for something specific? Check our{" "}
                  <Link to="/services" className="text-gold hover:underline">Services page</Link> or{" "}
                  <Link to="/about" className="text-gold hover:underline">About page</Link>.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
