import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const serviceLinks = [
  { label: "AI Readiness & Adoption", to: "/services/ai-readiness", sub: false },
  { label: "nsite", to: "/services/nsite", sub: true },
  { label: "Advisory & Foresight", to: "/services/advisory", sub: false },
  { label: "Workforce Development & Training", to: "/services/workforce-development", sub: false },
  { label: "Cybersecurity & IT Modernization", to: "/services/cybersecurity-modernization", sub: false },
];

const topLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Government", to: "/government" },
  { label: "Contact", to: "/contact" },
];

const NavDesktopLink = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`text-sm font-medium transition-colors relative group ${
      active ? "text-gold" : "text-cream/80 hover:text-gold"
    }`}
  >
    {label}
    <span
      className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-200 ${
        active ? "w-full" : "w-0 group-hover:w-full"
      }`}
    />
  </Link>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isServicesActive = location.pathname.startsWith("/services");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-navy-light">
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="The Cyber Consultant" className="h-8 md:h-10 w-auto" />
          <span className="font-serif text-xl md:text-2xl text-cream tracking-tight">The Cyber Consultant</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavDesktopLink to="/" label="Home" active={location.pathname === "/"} />
          <NavDesktopLink to="/about" label="About" active={location.pathname === "/about"} />

          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen((o) => !o)}
              className={`text-sm font-medium transition-colors flex items-center gap-1 relative group ${
                isServicesActive ? "text-gold" : "text-cream/80 hover:text-gold"
              }`}
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-200 ${
                  isServicesActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 mt-3 w-72 bg-navy border border-navy-light rounded-lg shadow-2xl overflow-hidden z-50">
                {serviceLinks.map((link) =>
                  link.sub ? (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-2 pl-8 pr-4 py-2.5 text-sm transition-colors hover:bg-navy-light ${
                        location.pathname === link.to ? "text-gold" : "text-cream/50 hover:text-gold"
                      }`}
                    >
                      <span className="text-gold/40 text-xs">↳</span>
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-navy-light ${
                        location.pathname === link.to ? "text-gold" : "text-cream/80 hover:text-gold"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          <NavDesktopLink to="/government" label="Government" active={location.pathname === "/government"} />
          <NavDesktopLink to="/contact" label="Contact" active={location.pathname === "/contact"} />

          <Button variant="nav-cta" size="sm" asChild>
            <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
              Schedule a Discovery Call
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-cream p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy border-t border-navy-light">
          <div className="container-page py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-2 px-1 transition-colors ${
                location.pathname === "/" ? "text-gold" : "text-cream/80 hover:text-gold"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-2 px-1 transition-colors ${
                location.pathname === "/about" ? "text-gold" : "text-cream/80 hover:text-gold"
              }`}
            >
              About
            </Link>

            {/* Mobile services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen((o) => !o)}
                className={`w-full flex items-center justify-between text-base font-medium py-2 px-1 transition-colors ${
                  isServicesActive ? "text-gold" : "text-cream/80"
                }`}
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileServicesOpen && (
                <div className="flex flex-col mt-1 mb-1">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`py-2 text-sm transition-colors ${
                        link.sub ? "pl-10 text-cream/50 hover:text-gold" : "pl-4 text-cream/70 hover:text-gold"
                      } ${location.pathname === link.to ? "text-gold" : ""}`}
                    >
                      {link.sub ? `↳ ${link.label}` : link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/government"
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-2 px-1 transition-colors ${
                location.pathname === "/government" ? "text-gold" : "text-cream/80 hover:text-gold"
              }`}
            >
              Government
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-2 px-1 transition-colors ${
                location.pathname === "/contact" ? "text-gold" : "text-cream/80 hover:text-gold"
              }`}
            >
              Contact
            </Link>

            <Button variant="nav-cta" className="w-full mt-2" asChild>
              <a href="https://calendly.com/podcast-lakeidra/discovery-call" target="_blank" rel="noopener noreferrer">
                Schedule a Discovery Call
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
