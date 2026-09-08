import { useState } from "react";
import { ArrowUpRight, CalendarDays, Clock3, MapPin, Repeat2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import weeklyZoom from "@/assets/activities/weekly_zoom.jpg";
import workshop from "@/assets/activities/workshop.jpg";
import marchEvent from "@/assets/activities/0322_yangsheng.jpg";
import mayEvent from "@/assets/activities/0524_yangsheng.jpg";
import juneEvent from "@/assets/activities/0628_yangsheng.jpg";
import julyEvent from "@/assets/activities/0726_gift.jpg";

type Poster = { id: string; image: string; titleKey: string; metaKey: string; altKey: string };

const pastActivities: Poster[] = [
  { id: "july", image: julyEvent, titleKey: "activities.past.july.title", metaKey: "activities.past.july.meta", altKey: "activities.past.july.alt" },
  { id: "june", image: juneEvent, titleKey: "activities.past.june.title", metaKey: "activities.past.june.meta", altKey: "activities.past.june.alt" },
  { id: "may", image: mayEvent, titleKey: "activities.past.may.title", metaKey: "activities.past.may.meta", altKey: "activities.past.may.alt" },
  { id: "march", image: marchEvent, titleKey: "activities.past.march.title", metaKey: "activities.past.march.meta", altKey: "activities.past.march.alt" },
];

export function Activities() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Poster | null>(null);
  const weeklyPoster: Poster = { id: "weekly", image: weeklyZoom, titleKey: "activities.weekly.title", metaKey: "activities.weekly.meta", altKey: "activities.weekly.alt" };
  const workshopPoster: Poster = { id: "workshop", image: workshop, titleKey: "activities.workshop.title", metaKey: "activities.workshop.meta", altKey: "activities.workshop.alt" };

  return (
    <section id="activities" className="section-anchor overflow-hidden bg-deep py-20 text-white md:py-28">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-12 grid gap-6 border-b border-white/15 pb-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="section-kicker text-gold">Events & Courses</p>
            <h2 className="font-serif text-4xl font-medium md:text-5xl">{t("activities.title")}</h2>
          </div>
          {/* <p className="max-w-xl leading-7 text-white/60 lg:justify-self-end">{t("activities.intro")}</p> */}
        </div>

        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_0_5px_rgba(201,155,80,0.14)]" />
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold">{t("activities.ongoingTitle")}</h3>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="flex min-h-[27rem] flex-col justify-between border border-gold/30 bg-white/[0.045] p-7 transition-colors hover:bg-white/[0.07] md:p-10">
            <div>
              <div className="mb-10 flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 bg-gold px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-deep"><Repeat2 className="h-3.5 w-3.5" />{t("activities.recurring")}</span>
                <span className="font-serif text-4xl text-white/15">01</span>
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">{t("activities.weekly.eyebrow")}</p>
              <h4 className="mt-3 max-w-md font-serif text-3xl leading-tight md:text-4xl">{t("activities.weekly.title")}</h4>
              <p className="mt-5 max-w-xl leading-7 text-white/60">{t("activities.weekly.desc")}</p>
            </div>
            <div>
              <div className="mt-8 grid gap-3 border-t border-white/15 pt-6 text-sm text-white/75 sm:grid-cols-2">
                <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-gold" />{t("activities.weekly.date")}</span>
                <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-gold" />18:30–19:30</span>
                <span className="flex items-center gap-2 sm:col-span-2"><MapPin className="h-4 w-4 text-gold" />{t("activities.weekly.location")}</span>
              </div>
              <button type="button" onClick={() => setSelected(weeklyPoster)} className="mt-7 inline-flex items-center gap-2 border border-gold px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-deep">{t("activities.viewPoster")} <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </article>

          <article className="flex min-h-[27rem] flex-col justify-between border border-white/15 bg-white/[0.07] p-7 text-white transition-colors hover:bg-white/[0.1] md:p-10">
            <div>
              <div className="mb-10 flex items-center justify-between gap-4">
                <span className="bg-gold px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-deep">{t("activities.inProgress")}</span>
                <span className="font-serif text-4xl text-white/15">02</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{t("activities.workshop.eyebrow")}</p>
              <h4 className="mt-3 max-w-xl font-serif text-3xl leading-tight md:text-4xl">{t("activities.workshop.title")}</h4>
              <p className="mt-5 max-w-2xl leading-7 text-white/60">{t("activities.workshop.desc")}</p>
            </div>
            <div>
              <div className="mt-8 grid gap-3 border-t border-white/15 pt-6 text-sm text-white/75 sm:grid-cols-2">
                <span className="flex items-start gap-2"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{t("activities.workshop.dates")}</span>
                <span className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />Point Cook Community Learning Centre</span>
              </div>
              <button type="button" onClick={() => setSelected(workshopPoster)} className="mt-7 inline-flex items-center gap-2 border border-gold px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-deep">{t("activities.viewPoster")} <ArrowUpRight className="h-4 w-4" /></button>
            </div>
          </article>
        </div>

        <div className="mt-20 md:mt-24">
          <div className="mb-8 flex flex-col justify-between gap-3 border-b border-white/15 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Archive</p>
              <h3 className="mt-2 font-serif text-3xl md:text-4xl">{t("activities.pastTitle")}</h3>
            </div>
            {/* <p className="text-sm text-white/50">{t("activities.pastIntro")}</p> */}
          </div>
          <div className="border-t border-white/15">
            {pastActivities.map((activity, index) => (
              <article key={activity.id} className="grid gap-3 border-b border-white/15 py-5 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-center md:gap-5 md:py-6">
                <span className="font-serif text-2xl text-gold/70">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">{t(activity.metaKey)} · {t("activities.completed")}</p>
                  <h4 className="mt-1.5 text-xl font-semibold md:text-2xl">{t(activity.titleKey)}</h4>
                  <p className="mt-1.5 max-w-3xl text-sm leading-6 text-white/55">{t(`activities.past.${activity.id}.desc`)}</p>
                </div>
                <button type="button" onClick={() => setSelected(activity)} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-gold md:justify-self-end">{t("activities.viewPoster")} <ArrowUpRight className="h-4 w-4" /></button>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[92vh] overflow-y-auto border-0 bg-[#f5f0e7] p-0 sm:max-w-4xl">
          {selected && (
            <div className={selected.id === "workshop" ? "" : "mx-auto max-w-xl"}>
              <DialogHeader className="sr-only">
                <DialogTitle>{t(selected.titleKey)}</DialogTitle>
                <DialogDescription>{t(selected.metaKey)}</DialogDescription>
              </DialogHeader>
              <img src={selected.image} alt={t(selected.altKey)} className="h-auto w-full" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
