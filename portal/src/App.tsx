import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Membership } from "./pages/Membership";
import { Knowledge } from "./pages/Knowledge";
import { Activities } from "./pages/Activities";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="membership" element={<Membership />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="activities" element={<Activities />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
