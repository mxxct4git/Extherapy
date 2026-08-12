import { useTranslation } from "react-i18next";
import logoUrl from "@/assets/logo.png";

export function About() {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith("en") ?? false;

  return (
    <section id="about" className={`section-anchor bg-secondary ${isEnglish ? "py-16 md:py-20" : "py-20 md:py-28"}`}>
      <div className="container mx-auto grid items-center gap-14 px-6 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-xl bg-white px-8 py-14 text-center shadow-[18px_18px_0_#d9c69f] md:px-12 md:py-20">
          <img src={logoUrl} alt="CMETA" className="mx-auto h-40 w-auto object-contain md:h-48" />
          <p className="mt-12 font-serif text-xl font-semibold text-primary md:text-2xl">{t("about.card.slogan")}</p>
          <p className="mt-3 font-serif text-base text-muted-foreground md:text-lg">{t("about.card.sloganEn")}</p>
        </div>

        <div>
          <p className={`section-kicker text-primary ${isEnglish ? "mb-3 text-[10px] tracking-[0.18em]" : ""}`}>{t("about.hero.eyebrow")}</p>
          <h2 className={`max-w-4xl font-serif font-medium text-primary ${isEnglish ? "text-2xl leading-[1.08] md:text-3xl" : "text-3xl leading-tight md:text-4xl"}`}>{t("about.ourStory.title")}</h2>
          <div className={`max-w-4xl text-muted-foreground ${isEnglish ? "mt-5 space-y-4 text-[13px] leading-6 md:text-sm md:leading-7" : "mt-7 space-y-6 text-sm leading-8 md:text-base md:leading-9"}`}>
            <p>{t("about.ourStory.p1")}</p>
            <p>{t("about.ourStory.p2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
