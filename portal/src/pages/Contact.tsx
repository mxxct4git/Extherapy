import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, QrCode } from "lucide-react";
import { useTranslation } from "react-i18next";
import qrImage from "@/assets/qr.png";

export function Contact() {
  const { t } = useTranslation();
  const [showQr, setShowQr] = useState(false);
  const qrArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (showQr && !qrArea.current?.contains(event.target as Node)) setShowQr(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [showQr]);

  return (
    <section id="contact" className="section-anchor bg-secondary py-20 md:py-28">
      <div className="container mx-auto grid gap-14 px-6 md:px-8 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="section-kicker">{t("contact.eyebrow")}</p>
          <h2 className="section-title">{t("contact.title")}</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">{t("contact.desc")}</p>
        </div>

        <div className="flex flex-col justify-center gap-6 border-t border-border pt-9 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
          <a href="mailto:info@cmeta.org.au" className="group flex items-center gap-4 text-primary">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 bg-white"><Mail className="h-5 w-5" /></span>
            <span className="font-serif text-xl group-hover:text-gold md:text-2xl">info@cmeta.org.au</span>
          </a>
          <div className="flex items-center gap-4 text-primary">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 bg-white"><MapPin className="h-5 w-5" /></span>
            <span className="font-serif text-xl md:text-2xl">{t("footer.location")}</span>
          </div>

          <div ref={qrArea} className="relative w-fit" onMouseEnter={() => setShowQr(true)} onMouseLeave={() => setShowQr(false)}>
            <button type="button" onClick={() => setShowQr((value) => !value)} aria-expanded={showQr} aria-controls="contact-qr" className="inline-flex items-center gap-3 border border-primary px-5 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
              <QrCode className="h-5 w-5" /> {t("contact.wechat")}
            </button>
            {showQr && (
              <div id="contact-qr" className="absolute bottom-full left-0 z-20 mb-4 w-52 bg-white p-3 shadow-[0_20px_60px_rgba(9,46,40,0.25)] after:absolute after:left-6 after:top-full after:border-8 after:border-transparent after:border-t-white">
                <img src={qrImage} alt={t("contact.qrAlt")} className="h-48 w-full object-contain" />
                <p className="mt-2 text-center text-xs text-muted-foreground">{t("contact.qrHint")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
