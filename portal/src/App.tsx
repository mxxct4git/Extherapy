import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Membership } from "./pages/Membership";
import { Knowledge } from "./pages/Knowledge";
import { Activities } from "./pages/Activities";
import { Contact } from "./pages/Contact";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Home />
        <About />
        <Membership />
        <Knowledge />
        <Activities />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
