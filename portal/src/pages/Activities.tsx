import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockActivities = [
  { id: 1, type: "学术交流", title: "2023 国际外治法学术研讨会", date: "2023-11-20", location: "北京国际会议中心", summary: "汇聚全球外治法领域专家，探讨最新研究成果与临床应用。", details: "本次研讨会将围绕针灸、推拿、拔罐等传统外治法在现代医学中的创新应用展开深入讨论。届时将有数十位国内外知名专家进行主题演讲，并设立实操工作坊，为参会者提供交流与学习的平台。", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, type: "社区公益", title: "社区中医外治法义诊活动", date: "2023-12-05", location: "朝阳区阳光社区文化广场", summary: "为社区居民提供免费的中医外治法体验与健康咨询服务。", details: "外治法协会联合多家医疗机构，走进社区开展义诊活动。活动内容包括免费的推拿按摩、拔罐体验、耳穴压豆等，同时提供个性化的健康养生指导，普及中医外治法知识。", image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb2?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, type: "专业培训", title: "第一期外治法适宜技术培训班", date: "2024-01-10", location: "上海中医药大学附属培训中心", summary: "针对基层医疗工作者，开展实用的外治法技术系统培训。", details: "为了提升基层医疗服务能力，本次培训班将系统讲授多种安全、有效、易于掌握的外治法适宜技术。课程设置理论与实践相结合，考核合格者将颁发结业证书。", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop" },
];

export function Activities() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<(typeof mockActivities)[number] | null>(null);

  return (
    <section id="activities" className="section-anchor bg-deep py-20 text-white md:py-28">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-kicker text-gold">Events & Courses</p>
            <h2 className="font-serif text-4xl font-medium md:text-5xl">{t("activities.title")}</h2>
          </div>
          <p className="max-w-lg leading-7 text-white/60">{t("activities.intro")}</p>
        </div>

        <div className="border-t border-white/25">
          {mockActivities.map((activity, index) => (
            <article key={activity.id} className="grid gap-5 border-b border-white/15 py-7 md:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:items-center md:gap-7">
              <span className="font-serif text-2xl text-gold">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{activity.type} · {activity.date}</p>
                <h3 className="mt-2 text-xl font-semibold md:text-2xl">{activity.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/62">{activity.summary}</p>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/48"><MapPin className="h-4 w-4" />{activity.location}</p>
              </div>
              <button type="button" onClick={() => setSelected(activity)} className="inline-flex w-fit items-center gap-2 border border-gold px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-deep md:justify-self-end">
                {t("activities.viewDetails")} <ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="overflow-hidden border-0 bg-background p-0 sm:max-w-[650px]">
          {selected && <img src={selected.image} alt={selected.title} className="h-56 w-full object-cover" />}
          <div className="p-7 md:p-9">
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl leading-tight text-primary">{selected?.title}</DialogTitle>
              <DialogDescription className="pt-3 leading-7 text-muted-foreground">
                <span className="block">{t("activities.date")} {selected?.date}</span>
                <span className="block">{t("activities.location")} {selected?.location}</span>
              </DialogDescription>
            </DialogHeader>
            <p className="py-6 leading-8 text-foreground/75">{selected?.details}</p>
            <DialogFooter><Button onClick={() => setSelected(null)}>{t("activities.close")}</Button></DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
