import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logoUrl from "@/assets/logo.png";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-dark text-secondary py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-4">
          {/* Brand & Slogan */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="rounded-md">
                <img src={logoUrl} alt="CMETA Logo" className="h-20 w-auto object-contain brightness-0 invert" />
              </div>
            </Link>
            <p className="text-sm text-secondary/80 leading-relaxed whitespace-pre-line">
              {t("footer.slogan")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">{t("footer.quickNav")}</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-secondary/80 hover:text-white transition-colors">
                {t("nav.about")}
              </Link>
              <Link to="/membership" className="text-sm text-secondary/80 hover:text-white transition-colors">
                {t("nav.membership")}
              </Link>
              <Link to="/activities" className="text-sm text-secondary/80 hover:text-white transition-colors">
                {t("nav.activities")}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">{t("footer.contact")}</h3>
            <div className="flex flex-col space-y-2 text-sm text-secondary/80">
              <p>{t("footer.email")}</p>
              <p>{t("footer.location")}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-secondary/10 text-center md:text-left">
          <p className="text-xs text-secondary/50">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
