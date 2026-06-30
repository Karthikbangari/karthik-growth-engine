import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import ToolsPage from "./pages/ToolsPage";
import ContactPage from "./pages/ContactPage";
import Dashboard from "./pages/Dashboard";

// Lazy WebGL gradient that sits behind the entire site.
const HeroGradient = lazy(() => import("./components/HeroGradient"));

// A light static version of the same sky-cyan → ivory → pink wash.
const StaticSky = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#4de7ff]/25 via-sand to-[#fdd4ff]/40" />
);

// Most visitors are on phones — only run the heavy animated WebGL gradient on
// larger screens (and never when the user prefers reduced motion). Phones get
// the static wash above: same look, no battery drain, no extra download.
function useAnimatedBg() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setOn(wide.matches && !calm.matches);
    update();
    wide.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);
  return on;
}

// Scroll to top whenever the route changes.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  const animatedBg = useAnimatedBg();
  return (
    <div className="flex min-h-screen flex-col">
      {/* Dreamy gradient behind the whole site — animated on desktop, static on mobile */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {animatedBg ? (
          <Suspense fallback={<StaticSky />}>
            <HeroGradient />
          </Suspense>
        ) : (
          <StaticSky />
        )}
        {/* gentle site-wide scrim keeps text readable over the gradient */}
        <div className="absolute inset-0 bg-sand/35" />
      </div>

      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Unknown routes fall back to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
