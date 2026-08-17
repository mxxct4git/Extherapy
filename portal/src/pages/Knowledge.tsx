import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/external-therapies/hero.jpg";

export function Knowledge() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section id="knowledge" className="section-anchor bg-[#f6f3ec] py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Knowledge</p>
            <h2 className="section-title">{t("knowledge.title")}</h2>
          </div>
          <p className="max-w-lg leading-7 text-muted-foreground">{t("knowledge.intro")}</p>
        </div>

        <article className="relative isolate min-h-[560px] overflow-hidden bg-deep text-white">
          <img src={heroImage} alt={t("knowledge.external.heroAlt")} className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/90 to-deep/10" />
          <div className="relative flex min-h-[560px] max-w-3xl flex-col justify-center p-8 md:p-14 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{t("knowledge.external.eyebrow")}</p>
            <h3 className="mt-5 font-serif text-4xl font-medium leading-tight md:text-6xl">{t("knowledge.external.title")}</h3>
            <p className="mt-3 font-serif text-xl text-gold md:text-2xl">{t("knowledge.external.titleEn")}</p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 md:text-lg">{t("knowledge.external.intro")}</p>
            <button type="button" onClick={() => navigate("/knowledge/external-therapies")} className="mt-9 inline-flex w-fit items-center gap-3 bg-gold px-6 py-4 font-semibold text-deep transition-colors hover:bg-[#d8ad67]">
              {t("knowledge.external.explore")} <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
