import { useTranslation } from "react-i18next";
import { ArrowDownRight } from "lucide-react";
import heroImage from "@/assets/hero-reference.jpg";

export function Home() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith("en") ?? false;
  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-primary text-white">
      <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <img src={heroImage} alt={t("home.hero.visualTitle")} className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/35 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,155,80,0.16),transparent_36%)]" />

      <div className="container relative mx-auto grid min-h-[calc(100vh-5rem)] items-center px-6 py-24 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <p className={`mb-6 font-bold uppercase text-gold ${isEnglish ? "text-[11px] tracking-[0.18em] md:text-xs" : "text-xs tracking-[0.28em]"}`}>{t("home.hero.eyebrow")}</p>
          <h1 className={`whitespace-pre-line font-serif font-medium ${isEnglish ? "text-4xl leading-[1.08] md:text-5xl lg:text-[3.6rem]" : "text-5xl leading-[1.12] md:text-7xl lg:text-[5rem]"}`}>
            {t("home.hero.title")}
          </h1>
          <p className={`mt-8 max-w-xl text-white/76 ${isEnglish ? "text-sm leading-7 md:text-base" : "text-base leading-8 md:text-lg"}`}>{t("home.hero.lead")}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button type="button" onClick={() => goTo("about")} className="inline-flex items-center gap-3 bg-gold px-6 py-4 font-semibold text-primary transition-colors hover:bg-[#d8ad67]">
              {t("home.hero.aboutBtn")} <ArrowDownRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => goTo("activities")} className="border border-white/45 px-6 py-4 font-semibold text-white transition-colors hover:border-gold hover:text-gold">
              {t("nav.activities")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
