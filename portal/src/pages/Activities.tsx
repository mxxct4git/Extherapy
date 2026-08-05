import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const mockActivities = [
  {
    id: 1,
    title: "2023 国际外治法学术研讨会",
    date: "2023-11-20",
    location: "北京国际会议中心",
    summary: "汇聚全球外治法领域专家，探讨最新研究成果与临床应用。",
    details: "本次研讨会将围绕针灸、推拿、拔罐等传统外治法在现代医学中的创新应用展开深入讨论。届时将有数十位国内外知名专家进行主题演讲，并设立实操工作坊，为参会者提供交流与学习的平台。",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "社区中医外治法义诊活动",
    date: "2023-12-05",
    location: "朝阳区阳光社区文化广场",
    summary: "为社区居民提供免费的中医外治法体验与健康咨询服务。",
    details: "外治法协会联合多家医疗机构，走进社区开展义诊活动。活动内容包括免费的推拿按摩、拔罐体验、耳穴压豆等，同时提供个性化的健康养生指导，普及中医外治法知识。",
    image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "第一期外治法适宜技术培训班",
    date: "2024-01-10",
    location: "上海中医药大学附属培训中心",
    summary: "针对基层医疗工作者，开展实用的外治法技术系统培训。",
    details: "为了提升基层医疗服务能力，本次培训班将系统讲授多种安全、有效、易于掌握的外治法适宜技术。课程设置理论与实践相结合，考核合格者将颁发结业证书。",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop"
  }
];

export function Activities() {
  const { t } = useTranslation();
  const [selectedActivity, setSelectedActivity] = useState<typeof mockActivities[0] | null>(null);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-10 text-center text-foreground">
        {t("activities.title")}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockActivities.map((activity) => (
          <div 
            key={activity.id} 
            className="group rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={activity.image} 
                alt={activity.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {activity.title}
              </h2>
              <div className="text-sm text-muted-foreground mb-4 space-y-1">
                <p>📅 {activity.date}</p>
                <p>📍 {activity.location}</p>
              </div>
              <p className="text-foreground/80 text-sm mb-6 flex-1 line-clamp-3">
                {activity.summary}
              </p>
              <Button 
                onClick={() => setSelectedActivity(activity)}
                className="w-full mt-auto"
              >
                {t("activities.viewDetails")}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedActivity?.title}</DialogTitle>
            <DialogDescription className="text-base pt-2">
              <span className="block font-medium text-foreground">{t("activities.date")} {selectedActivity?.date}</span>
              <span className="block font-medium text-foreground mt-1">{t("activities.location")} {selectedActivity?.location}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <img 
              src={selectedActivity?.image} 
              alt={selectedActivity?.title} 
              className="w-full h-[250px] object-cover rounded-lg mb-6"
            />
            <p className="text-foreground/80 leading-relaxed text-lg">
              {selectedActivity?.details}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedActivity(null)}>
              {t("activities.close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
