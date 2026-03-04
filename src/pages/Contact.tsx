import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, MapPin, Globe, Calendar } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  organization: z.string().trim().max(200).optional(),
  service: z.string().optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    toast.success("Message sent! We'll be in touch within 24 business hours.");
    setForm({ name: "", email: "", phone: "", organization: "", service: "", message: "" });
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-cream text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";
  const labelClass = "block text-sm font-medium mb-1.5";

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20 md:py-28 text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">Let's Talk</h1>
            <p className="text-cream/70 text-xl">Every engagement begins with a conversation.</p>
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
                <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                  Schedule Your Discovery Call
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-cream">
        <div className="container-page py-12 pb-20 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Form */}
            <AnimatedSection className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name *</label>
                    <input id="name" name="name" value={form.name} onChange={handleChange} className={inputClass} aria-required="true" />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} aria-required="true" />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input id="phone" name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="organization" className={labelClass}>Organization</label>
                    <input id="organization" name="organization" value={form.organization} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className={labelClass}>Service Interest</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange} className={inputClass}>
                    <option value="">Select a service...</option>
                    <option value="keynote">Keynote &amp; Speaking</option>
                    <option value="workshops">Workshops</option>
                    <option value="curriculum">Curriculum Partnership</option>
                    <option value="advisory">Advisory</option>
                    <option value="book">Book Order</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Message *</label>
                  <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} className={inputClass} aria-required="true" />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" variant="gold" size="lg" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.15}>
              <div className="bg-cream-dark rounded-xl p-6 border border-border space-y-6">
                <div>
                  <h3 className="font-serif text-xl mb-3">Direct Contact</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                      <a href="mailto:hello@thecyberconsultantllc.com" className="hover:text-gold transition-colors">
                        hello@thecyberconsultantllc.com
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                      <span>Birmingham, Alabama</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe size={16} className="text-gold mt-0.5 shrink-0" />
                      <a href="https://thecyberconsultantllc.com" className="hover:text-gold transition-colors">
                        thecyberconsultantllc.com
                      </a>
                    </div>
                  </div>
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
