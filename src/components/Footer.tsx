import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy text-cream/70 py-12 border-t border-navy-light">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-serif text-xl text-cream mb-3">The Cyber Consultant</h4>
            <p className="text-sm leading-relaxed">
              Cybersecurity education and curriculum consultancy based in Birmingham, Alabama.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Navigation</h5>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm hover:text-gold transition-colors">Home</Link>
              <Link to="/about" className="text-sm hover:text-gold transition-colors">About</Link>
              <Link to="/services" className="text-sm hover:text-gold transition-colors">Services</Link>
              <Link to="/contact" className="text-sm hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h5 className="font-semibold text-cream mb-3 text-sm uppercase tracking-wider">Contact</h5>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:hello@thecyberconsultantllc.com" className="hover:text-gold transition-colors">
                hello@thecyberconsultantllc.com
              </a>
              <span>Birmingham, Alabama</span>
              <a href="https://thecyberconsultantllc.com" className="hover:text-gold transition-colors">
                thecyberconsultantllc.com
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          © {new Date().getFullYear()} The Cyber Consultant LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
