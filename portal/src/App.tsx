import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Membership } from "./pages/Membership";
import { Knowledge } from "./pages/Knowledge";
import { Activities } from "./pages/Activities";
import { Contact } from "./pages/Contact";
import { ExternalTherapies } from "./pages/ExternalTherapies";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

function ScrollToLocation() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
}

function HomePage() {
  return (
    <>
      <Home />
      <About />
      <Membership />
      <Knowledge />
      <Activities />
      <Contact />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToLocation />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/knowledge/external-therapies" element={<ExternalTherapies />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
