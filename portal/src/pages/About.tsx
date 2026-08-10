import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  const coreValues = t("about.mission.coreValues", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  const whoWeServe = t("about.whoWeServe.items", { returnObjects: true }) as Array<{
    num: string;
    title: string;
    desc: string;
  }>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-secondary/30 py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1 mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl transform -translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85" 
                alt="About CMETA Visual" 
                className="relative rounded-3xl w-full h-[300px] md:h-[400px] object-cover shadow-lg"
              />
            </div>
            <div className="text-left order-1 lg:order-2">
              <div className="text-primary font-semibold tracking-wider uppercase text-sm mb-4">
                {t("about.hero.eyebrow")}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-dark leading-tight">
                {t("about.hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-dark/70 max-w-2xl">
                {t("about.hero.lead")}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm block mb-3">
                {t("about.ourStory.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">
                {t("about.ourStory.title")}
              </h2>
              <div className="space-y-6 text-lg text-dark/70 leading-relaxed">
                <p>{t("about.ourStory.p1")}</p>
                <p>{t("about.ourStory.p2")}</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85" 
                alt="Our Story Visual" 
                className="relative rounded-3xl w-full h-[430px] object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm block mb-3">
              {t("about.mission.eyebrow")}
            </span>
          </div>

          {/* Bottom: Core Values as Three Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((item, index) => (
              <div key={index} className="bg-background p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary/50 text-center group">
                <h4 className="text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-dark/70 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-24">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm block mb-3">
                {t("about.whoWeServe.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark">
                {t("about.whoWeServe.title")}
              </h2>
            </div>
            <div className="flex flex-col space-y-12">
              {whoWeServe.map((item, index) => (
                <div key={index} className="flex gap-6 items-start group">
                  <span className="text-4xl font-bold text-secondary-foreground/20 group-hover:text-primary transition-colors">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-dark mb-2">{item.title}</h3>
                    <p className="text-lg text-dark/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
