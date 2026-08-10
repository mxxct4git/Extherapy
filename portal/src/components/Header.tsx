import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo.png";

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "zh" ? "en" : "zh");
  };

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.membership"), path: "/membership" },
    // { name: t("nav.activities"), path: "/activities" },
    // { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logoUrl} alt="CMETA Logo" className="h-20 w-auto object-contain" />
          <div className="hidden md:flex flex-col">
            <span className="text-lg font-bold tracking-tight text-primary leading-tight">
              {t("footer.brand")}
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              {t("footer.brandSub")}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/70"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-4 border-l pl-6 border-border">
            <Button variant="ghost" size="sm" onClick={toggleLanguage}>
              {t("nav.switchLang")}
            </Button>
            {/* <Button size="sm">
              {t("nav.join")}
            </Button> */}
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="sm" onClick={toggleLanguage}>
            {t("nav.switchLang")}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b bg-background px-4 py-4 space-y-4 shadow-lg absolute w-full left-0">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/70"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/50">
              {/* <Button size="default" className="w-full">
                {t("nav.join")}
              </Button> */}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
