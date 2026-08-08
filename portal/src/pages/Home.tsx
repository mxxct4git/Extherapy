import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Home() {
  const { t } = useTranslation();

  const therapies = t("home.therapies.items", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;

  const memberships = t("home.membership.items", { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    desc: string;
  }>;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="bg-secondary/80 py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                {t("home.hero.eyebrow")}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-dark leading-tight whitespace-pre-line">
                {t("home.hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-dark/70 leading-relaxed max-w-lg">
                {t("home.hero.lead")}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/about">{t("home.hero.aboutBtn")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                  <Link to="/membership">{t("home.hero.memberBtn")}</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-secondary/50 max-w-sm transform hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-dark mb-4">
                  {t("home.hero.visualTitle")}
                </h3>
                <p className="text-primary font-medium">
                  {t("home.hero.visualSub")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm block mb-3">
                {t("home.whoWeAre.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark">
                {t("home.whoWeAre.title")}
              </h2>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-lg text-dark/70 leading-relaxed mb-8">
                {t("home.whoWeAre.lead")}
              </p>
              <Button asChild variant="outline">
                <Link to="/about">{t("home.whoWeAre.btn")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. External Therapies */}
      <section className="py-24 bg-secondary/80">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm block mb-3">
              {t("home.therapies.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark">
              {t("home.therapies.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {therapies.map((item, index) => (
              <div key={index} className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-secondary/50">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl text-xl font-bold mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{item.title}</h3>
                <p className="text-dark/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Membership */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 max-w-3xl">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm block mb-3">
              {t("home.membership.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              {t("home.membership.title")}
            </h2>
            <p className="text-lg text-dark/70 leading-relaxed">
              {t("home.membership.lead")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberships.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="text-2xl text-primary mb-4 font-bold">{item.icon}</div>
                <h3 className="text-xl font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-dark/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {t("home.cta.title")}
              </h2>
              <p className="text-dark/70 text-lg">
                {t("home.cta.desc")}
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 shrink-0">
              <Link to="/contact">{t("home.cta.btn")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
