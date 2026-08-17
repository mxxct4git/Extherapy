import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { externalTherapies } from "@/data/externalTherapies";

export function ExternalTherapies() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("en") ? "en" : "zh";
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : externalTherapies[selectedIndex];

  const moveSelection = (direction: -1 | 1) => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return (current + direction + externalTherapies.length) % externalTherapies.length;
    });
  };

  return (
    <section className="bg-[#f6f3ec] pb-20 md:pb-28">
      <div className="border-b border-border bg-primary py-16 text-white md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <Link to="/#knowledge" className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" /> {t("knowledge.external.backToKnowledge")}
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{t("knowledge.external.collectionEyebrow")}</p>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-tight md:text-6xl">{t("knowledge.external.collectionTitle")}</h1>
            </div>
            <p className="max-w-2xl leading-8 text-white/68 lg:justify-self-end">{t("knowledge.external.intro")}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-14 md:px-8 md:pt-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {externalTherapies.map((therapy, index) => {
            const copy = therapy[language];
            return (
              <button
                key={therapy.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="group flex min-h-full flex-col overflow-hidden border border-border bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_45px_rgba(18,63,54,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
                  <img src={therapy.image} alt={copy.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-serif text-2xl text-gold">{String(index + 1).padStart(2, "0")}</span>
                    <ArrowUpRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h2 className="mt-5 font-serif text-2xl leading-tight text-primary">{copy.name}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{copy.description[0]}</p>
                  <span className="mt-6 border-b border-primary/35 pb-1 text-sm font-semibold text-primary group-hover:border-gold group-hover:text-gold">
                    {t("knowledge.external.viewIntroduction")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-20 grid overflow-hidden bg-primary text-white lg:grid-cols-[0.72fr_1.28fr] md:mt-28">
          <div className="flex min-h-72 flex-col justify-between bg-deep p-8 md:p-12">
            <span className="font-serif text-6xl text-gold/55">整体</span>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{t("knowledge.external.holisticEyebrow")}</p>
          </div>
          <div className="p-8 md:p-12 lg:p-14">
            <h2 className="font-serif text-3xl md:text-4xl">{t("knowledge.external.holisticTitle")}</h2>
            <div className="mt-7 space-y-5 leading-8 text-white/72">
              <p>{t("knowledge.external.holisticP1")}</p>
              <p>{t("knowledge.external.holisticP2")}</p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-5xl border-l-2 border-gold/70 pl-5 text-xs leading-6 text-muted-foreground">
          {t("knowledge.external.disclaimer")}
        </p>
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-5xl gap-0 overflow-hidden border-0 bg-background p-0 sm:rounded-none [&>button]:right-5 [&>button]:top-5 [&>button]:z-20 [&>button]:grid [&>button]:h-10 [&>button]:w-10 [&>button]:place-items-center [&>button]:rounded-full [&>button]:bg-white [&>button]:text-primary [&>button]:opacity-100 [&>button]:shadow-lg">
          {selected && (
            <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-[0.85fr_1.15fr] lg:overflow-hidden">
              <div className="relative min-h-64 bg-secondary lg:min-h-[620px]">
                <img src={selected.image} alt={selected[language].name} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/75 to-transparent p-6 pt-24 text-white lg:hidden">
                  <span className="font-serif text-3xl text-gold">{String(selectedIndex! + 1).padStart(2, "0")}</span>
                </div>
              </div>

              <div className="flex max-h-none flex-col lg:max-h-[92vh]">
                <div className="overflow-y-auto p-7 md:p-10 lg:p-12">
                  <span className="hidden font-serif text-3xl text-gold lg:block">{String(selectedIndex! + 1).padStart(2, "0")}</span>
                  <DialogTitle className="mt-3 font-serif text-3xl font-medium leading-tight text-primary md:text-4xl">{selected[language].name}</DialogTitle>
                  <DialogDescription className="sr-only">{t("knowledge.external.dialogDescription", { name: selected[language].name })}</DialogDescription>
                  <div className="mt-7 space-y-4 text-[15px] leading-7 text-foreground/75 md:text-base md:leading-8">
                    {selected[language].description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {selected[language].highlights && (
                    <div className="mt-8 grid gap-3">
                      {selected[language].highlights?.map((item) => (
                        <div key={item.title} className="border-l-2 border-gold bg-secondary/70 px-5 py-4">
                          <h3 className="font-serif text-lg text-primary">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-auto grid grid-cols-2 border-t border-border bg-white">
                  <button type="button" onClick={() => moveSelection(-1)} className="flex items-center gap-3 border-r border-border px-6 py-5 text-left text-sm font-semibold text-primary transition-colors hover:bg-secondary">
                    <ArrowLeft className="h-4 w-4" /> {t("knowledge.external.previous")}
                  </button>
                  <button type="button" onClick={() => moveSelection(1)} className="flex items-center justify-end gap-3 px-6 py-5 text-right text-sm font-semibold text-primary transition-colors hover:bg-secondary">
                    {t("knowledge.external.next")} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
