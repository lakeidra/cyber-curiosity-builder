import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-navy text-cream/70 py-16 border-t border-navy-light">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="The Cyber Consultant" className="h-8 w-auto" />
              <h4 className="font-serif text-xl text-cream">The Cyber Consultant</h4>
            </div>
            <p className="text-sm italic text-gold mb-2">Helping Humans Understand Machines.</p>
            <p className="text-sm leading-relaxed">
              Foresight strategy, AI readiness, and workforce training for enterprises and government. Birmingham, Alabama.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Navigation</h5>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-gold transition-colors">Home</Link>
              <Link to="/about" className="text-sm hover:text-gold transition-colors">About</Link>
              <Link to="/services" className="text-sm hover:text-gold transition-colors">Services</Link>
              <Link to="/government" className="text-sm hover:text-gold transition-colors">Government</Link>
              <Link to="/contact" className="text-sm hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Services</h5>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/services/ai-readiness" className="hover:text-gold transition-colors">AI Readiness & Adoption</Link>
              <Link to="/services/advisory" className="hover:text-gold transition-colors">Advisory & Foresight</Link>
              <Link to="/services/workforce-development" className="hover:text-gold transition-colors">Workforce Development</Link>
              <Link to="/services/cybersecurity-modernization" className="hover:text-gold transition-colors">Cybersecurity & IT Modernization</Link>
              <Link to="/ai-readiness-check" className="hover:text-gold transition-colors">Free AI Readiness Check</Link>
              <a href="/TCC-Capability-Statement.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Capability Statement (PDF)</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Contact</h5>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:hello@the-cyber-consultant.com" className="hover:text-gold transition-colors">
                hello@the-cyber-consultant.com
              </a>
              <span>Birmingham, Alabama</span>
              <a href="https://the-cyber-consultant.com" className="hover:text-gold transition-colors">
                the-cyber-consultant.com
              </a>
              <a
                href="https://www.linkedin.com/company/cyberconsultantllc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold transition-colors mt-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          © 2026 The Cyber Consultant, LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
