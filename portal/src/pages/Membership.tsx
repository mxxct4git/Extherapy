import { useTranslation } from "react-i18next";

export function Membership() {
  const { t } = useTranslation();

  const benefits = t("membership.benefits", { returnObjects: true }) as Array<{
    icon: string;
    tag: string;
    title: string;
    p1: string;
    p2?: string;
  }>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-primary text-secondary py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-secondary/80 font-semibold tracking-wider uppercase text-sm mb-4">
            {t("membership.hero.eyebrow")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            {t("membership.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-secondary/90 max-w-2xl mx-auto">
            {t("membership.hero.lead")}
          </p>
        </div>
      </header>

      {/* Benefits List */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex flex-col space-y-12">
            {benefits.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row gap-8 items-start bg-secondary/10 p-8 md:p-12 rounded-3xl border border-secondary/30 hover:border-primary/30 transition-colors"
              >
                <div className="text-5xl md:text-6xl font-bold text-primary/40 shrink-0 select-none">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                    {item.tag}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">
                    {item.title}
                  </h2>
                  <div className="space-y-4 text-dark/70 text-lg leading-relaxed">
                    <p>{item.p1}</p>
                    {item.p2 && <p>{item.p2}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
