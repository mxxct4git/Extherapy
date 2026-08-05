import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop)' }}
        >
          {/* Overlay Mask */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-4xl mb-6 shadow-lg">
            E
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t("home.heroTitle")}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-light">
            {t("home.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {t("home.aboutTitle")}
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            {t("home.aboutContent")}
          </p>
        </div>
      </section>
    </div>
  );
}
