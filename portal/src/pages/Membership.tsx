import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Membership() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const benefits = t("home.membership.items", { returnObjects: true }) as Array<{ title: string; desc: string }>;

  return (
    <section id="membership" className="section-anchor bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="section-kicker">{t("home.membership.eyebrow")}</p>
          <h2 className="section-title">{t("home.membership.title")}</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{t("home.membership.lead")}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => (
            <article key={item.title} className="group min-h-64 border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_45px_rgba(18,63,54,0.09)]">
              <span className="font-serif text-3xl text-gold">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-7 font-serif text-2xl text-primary">{item.title}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button type="button" onClick={() => navigate("/membership/apply")} className="inline-flex items-center gap-3 bg-primary px-7 py-4 font-semibold text-white transition-colors hover:bg-deep">
            {t("nav.join")} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
