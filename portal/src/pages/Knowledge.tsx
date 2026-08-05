import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const mockPosts = [
  {
    id: 1,
    title: "中医外治法之针灸概论",
    summary: "针灸是中医外治法的重要组成部分，通过刺激人体特定穴位，达到疏通经络、调和气血的目的。",
    content: "针灸是中医外治法的重要组成部分，通过刺激人体特定穴位，达到疏通经络、调和气血的目的。在现代医学研究中，针灸被证明能有效缓解疼痛，调节神经系统功能。其适应症广泛，包括各类痛症、神经系统疾病等。",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop",
    date: "2023-10-01"
  },
  {
    id: 2,
    title: "推拿按摩在现代康复中的应用",
    summary: "推拿通过手法作用于人体体表的特定部位，以调节机体生理、病理状况，达到理疗目的。",
    content: "推拿通过手法作用于人体体表的特定部位，以调节机体生理、病理状况，达到理疗目的。现代康复医学广泛吸纳了推拿技术，在颈椎病、腰椎间盘突出等肌肉骨骼系统疾病的康复治疗中发挥着不可替代的作用。",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
    date: "2023-10-15"
  },
  {
    id: 3,
    title: "拔罐疗法的原理与注意事项",
    summary: "拔罐利用负压使罐体吸附于体表，产生局部充血，从而达到通经活络、行气活血、消肿止痛的作用。",
    content: "拔罐利用负压使罐体吸附于体表，产生局部充血，从而达到通经活络、行气活血、消肿止痛的作用。拔罐时需注意避开皮肤破损处、大血管部位，同时拔罐时间不宜过长，一般以10-15分钟为宜，避免烫伤或起水泡。",
    image: "https://images.unsplash.com/photo-1606335543042-57c525922933?q=80&w=800&auto=format&fit=crop",
    date: "2023-11-02"
  }
];

export function Knowledge() {
  const { t } = useTranslation();
  const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);

  if (selectedPost) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => setSelectedPost(null)}
        >
          &larr; {t("knowledge.back")}
        </Button>
        <article className="prose lg:prose-xl max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedPost.title}</h1>
          <p className="text-muted-foreground mb-8">{selectedPost.date}</p>
          <img 
            src={selectedPost.image} 
            alt={selectedPost.title} 
            className="w-full h-[400px] object-cover rounded-xl mb-8 shadow-md"
          />
          <div className="text-lg leading-relaxed text-foreground/80">
            {selectedPost.content}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-10 text-center text-foreground">
        {t("knowledge.title")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockPosts.map((post) => (
          <div 
            key={post.id} 
            className="group rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col"
            onClick={() => setSelectedPost(post)}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                {post.summary}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <span className="text-sm font-medium text-primary flex items-center">
                  {t("knowledge.readMore")} &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
