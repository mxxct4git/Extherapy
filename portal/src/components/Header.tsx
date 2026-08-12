import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo.png";

const sectionIds = ["home", "about", "membership", "knowledge", "activities", "contact"];

export function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: t("nav.home"), id: "home" },
    { name: t("nav.about"), id: "about" },
    { name: t("nav.membership"), id: "membership" },
    { name: t("knowledge.title"), id: "knowledge" },
    { name: t("nav.activities"), id: "activities" },
    { name: t("nav.contact"), id: "contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-24% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const toggleLanguage = () => {
    void i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/10 bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <button type="button" onClick={() => goTo("home")} className="flex items-center gap-3 text-left" aria-label={t("nav.home")}>
          <img src={logoUrl} alt="CMETA" className="h-16 w-auto object-contain" />
          <div className="hidden flex-col md:flex">
            <span className="text-base font-bold leading-tight text-primary">{t("footer.brand")}</span>
            <span className="mt-1 text-[11px] tracking-wide text-muted-foreground">{t("footer.brandSub")}</span>
          </div>
        </button>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goTo(link.id)}
              className={cn(
                "relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-gold after:transition-transform",
                activeSection === link.id ? "text-primary after:scale-x-100" : "text-foreground/65 after:scale-x-0 hover:text-primary",
              )}
            >
              {link.name}
            </button>
          ))}
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="ml-2 border-l border-primary/15 pl-5 text-primary">
            {t("nav.switchLang")}
          </Button>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <Button variant="ghost" size="sm" onClick={toggleLanguage}>{t("nav.switchLang")}</Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen((value) => !value)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <nav className="absolute inset-x-0 top-20 border-b border-primary/10 bg-background px-5 py-5 shadow-xl lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-xl flex-col">
            {navLinks.map((link) => (
              <button key={link.id} type="button" onClick={() => goTo(link.id)} className={cn("border-b border-primary/10 py-3 text-left text-base", activeSection === link.id ? "font-semibold text-primary" : "text-foreground/70")}>
                {link.name}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
