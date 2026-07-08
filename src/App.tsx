import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Government from "./pages/Government";
import AIReadinessCheck from "./pages/AIReadinessCheck";
import AIReadiness from "./pages/services/AIReadiness";
import Advisory from "./pages/services/Advisory";
import WorkforceDevelopment from "./pages/services/WorkforceDevelopment";
import CyberModernization from "./pages/services/CyberModernization";
import NotFound from "./pages/NotFound";
// Legacy resources pages (superseded by /ai-readiness-check)
// import BoardReadiness from "./pages/BoardReadiness";
// import RiskExposureCheck from "./pages/RiskExposureCheck";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/ai-readiness" element={<AIReadiness />} />
          <Route path="/services/advisory" element={<Advisory />} />
          <Route path="/services/workforce-development" element={<WorkforceDevelopment />} />
          <Route path="/services/cybersecurity-modernization" element={<CyberModernization />} />
          <Route path="/government" element={<Government />} />
          <Route path="/ai-readiness-check" element={<AIReadinessCheck />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
