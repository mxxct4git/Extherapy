import { useTranslation } from "react-i18next";
import logoUrl from "@/assets/logo.png";

export function Footer() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith("en") ?? false;
  const links = [
    ["about", t("nav.about")], ["membership", t("nav.membership")], ["knowledge", t("knowledge.title")],
    ["activities", t("nav.activities")], ["contact", t("nav.contact")],
  ];

  return (
    <footer className="bg-[#072720] py-10 text-white/60">
      <div className={`container mx-auto grid items-center gap-8 px-6 md:px-8 xl:grid-cols-[auto_auto_auto] xl:justify-between ${isEnglish ? "xl:gap-3" : "xl:gap-8"}`}>
        <div className="flex items-center gap-4 whitespace-nowrap">
          <img src={logoUrl} alt="CMETA" className="h-16 w-auto object-contain brightness-0 invert" />
          <div>
            <p className="whitespace-nowrap font-serif text-lg text-white">{t("footer.brand")}</p>
            <p className="mt-1 text-xs">{t("footer.brandSub")}</p>
          </div>
        </div>
        <nav className={`flex flex-wrap gap-y-3 ${isEnglish ? "gap-x-3 text-sm xl:flex-nowrap" : "gap-x-6 text-sm"}`} aria-label="Footer navigation">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-gold">{label}</a>)}
        </nav>
        <p className={`${isEnglish ? "text-[11px] xl:whitespace-nowrap" : "text-xs"}`}>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
