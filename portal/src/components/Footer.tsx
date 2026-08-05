import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t bg-background py-6 mt-auto">
      <div className="container mx-auto px-4 md:px-8 text-center text-sm text-foreground/60">
        <p>© {new Date().getFullYear()} {t("home.heroTitle")}. All rights reserved.</p>
      </div>
    </footer>
  );
}
