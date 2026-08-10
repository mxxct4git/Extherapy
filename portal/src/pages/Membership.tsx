import { ChevronDown } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-background">
      {/* Image-ready hero */}
      <header className="relative overflow-hidden bg-secondary/45 py-20 md:py-24 lg:py-28">
        <div className="container relative z-10 mx-auto grid items-center gap-12 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-3xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {t("membership.hero.eyebrow")}
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-dark md:text-5xl lg:text-6xl">
              {t("membership.hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-dark/70 md:text-xl">
              {t("membership.hero.lead")}
            </p>
          </div>

          <div className="relative hidden min-h-[22rem] items-center justify-center lg:flex" aria-hidden="true">
            <div className="absolute h-80 w-80 rounded-full border border-primary/15" />
            <div className="absolute h-64 w-64 rounded-full border border-dashed border-primary/25" />
            <div className="absolute h-48 w-48 rounded-full bg-primary/10 blur-sm" />
            <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full bg-background/90 text-center shadow-[0_24px_60px_rgba(0,137,123,0.14)]">
              <span className="text-6xl font-bold leading-none text-primary">06</span>
              <span className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-dark/55">
                {t("membership.hero.visualLabel")}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop reading layout */}
      <section className="hidden py-24 md:block">
        <div className="container mx-auto grid max-w-6xl grid-cols-[15rem_minmax(0,1fr)] items-start gap-14 px-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
          <aside className="sticky top-28">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {t("membership.contentsLabel")}
            </p>
            <ol className="border-l border-primary/20">
              {benefits.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#benefit-${index + 1}`}
                    className="group flex gap-4 border-l-2 border-transparent py-3 pl-5 text-sm leading-snug text-dark/60 transition-colors hover:border-primary hover:text-primary"
                  >
                    <span className="font-bold text-primary/60">{String(index + 1).padStart(2, "0")}</span>
                    <span className="break-words">{item.tag.replace(/^\d{2}\s*/, "")}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div>
            {benefits.map((item, index) => (
              <article
                id={`benefit-${index + 1}`}
                key={index}
                className="scroll-mt-28 border-b border-secondary py-14 first:pt-0 last:border-0 last:pb-0"
              >
                <div className="mb-6 flex items-center gap-5">
                  <span className="text-5xl font-bold leading-none text-primary/15 lg:text-6xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {item.tag.replace(/^\d{2}\s*/, "")}
                  </span>
                </div>
                <h2 className="max-w-3xl break-words text-3xl font-bold leading-tight text-dark lg:text-4xl">
                  {item.title}
                </h2>
                <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-dark/70">
                  <p>{item.p1}</p>
                  {item.p2 && <p>{item.p2}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile accordion */}
      <section className="px-4 py-16 md:hidden">
        <div className="mx-auto max-w-xl divide-y divide-secondary border-y border-secondary">
          {benefits.map((item, index) => (
            <details key={index} className="group" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center gap-4 py-6 marker:hidden">
                <span className="text-sm font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 break-words text-lg font-bold leading-snug text-dark">{item.title}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="pb-7 pl-10 pr-3 text-base leading-relaxed text-dark/70">
                <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {item.tag.replace(/^\d{2}\s*/, "")}
                </span>
                <p>{item.p1}</p>
                {item.p2 && <p className="mt-4">{item.p2}</p>}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Membership CTA */}
      {/* <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                {t("membership.cta.eyebrow")}
              </span>
              <h2 className="text-3xl font-bold leading-tight text-dark md:text-4xl">{t("membership.cta.title")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-dark/70">{t("membership.cta.desc")}</p>
            </div>
            <Button asChild size="lg" className="shrink-0 bg-primary text-white hover:bg-primary/90">
              <Link to="/contact">{t("membership.cta.btn")}</Link>
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
