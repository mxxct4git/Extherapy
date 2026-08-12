import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const mockPosts = [
  { id: 1, title: "中医外治法之针灸概论", summary: "针灸是中医外治法的重要组成部分，通过刺激人体特定穴位，达到疏通经络、调和气血的目的。", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200&auto=format&fit=crop", date: "2023-10-01" },
  { id: 2, title: "推拿按摩在现代康复中的应用", summary: "推拿通过手法作用于人体体表的特定部位，以调节机体生理、病理状况，达到理疗目的。", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop", date: "2023-10-15" },
  { id: 3, title: "拔罐疗法的原理与注意事项", summary: "拔罐利用负压使罐体吸附于体表，产生局部充血，从而达到通经活络、行气活血的作用。", image: "https://images.unsplash.com/photo-1606335543042-57c525922933?q=80&w=900&auto=format&fit=crop", date: "2023-11-02" },
];

export function Knowledge() {
  const { t } = useTranslation();
  const [noticeFor, setNoticeFor] = useState<number | null>(null);

  useEffect(() => {
    if (noticeFor === null) return;
    const timer = window.setTimeout(() => setNoticeFor(null), 2600);
    return () => window.clearTimeout(timer);
  }, [noticeFor]);

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

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr] lg:grid-rows-2">
          {mockPosts.map((post, index) => (
            <article key={post.id} className={index === 0 ? "group relative min-h-[560px] overflow-hidden text-white lg:row-span-2" : "group relative min-h-[280px] overflow-hidden text-white"}>
              <img src={post.image} alt={post.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/45 to-transparent" />
              <div className={index === 0 ? "absolute inset-x-0 bottom-0 p-8 md:p-10" : "absolute inset-x-0 bottom-0 p-6"}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{post.date}</p>
                <h3 className={index === 0 ? "mt-3 max-w-2xl font-serif text-3xl md:text-4xl" : "mt-2 font-serif text-2xl"}>{post.title}</h3>
                {index === 0 && <p className="mt-4 max-w-2xl leading-7 text-white/75">{post.summary}</p>}
                <div className="relative mt-5 inline-block">
                  <button type="button" onClick={() => setNoticeFor(post.id)} aria-describedby={noticeFor === post.id ? `knowledge-tip-${post.id}` : undefined} className="inline-flex items-center gap-2 border-b border-white/60 pb-1 text-sm font-semibold hover:border-gold hover:text-gold">
                    {t("knowledge.readMore")} <ArrowUpRight className="h-4 w-4" />
                  </button>
                  {noticeFor === post.id && (
                    <div id={`knowledge-tip-${post.id}`} role="status" className="absolute bottom-full left-0 z-10 mb-3 w-max max-w-[16rem] bg-white px-4 py-3 text-sm font-medium text-primary shadow-xl after:absolute after:left-5 after:top-full after:border-8 after:border-transparent after:border-t-white">
                      {t("knowledge.comingSoon")}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
