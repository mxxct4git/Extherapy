import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, CheckCircle2, Loader2, Printer } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SignaturePad, type SignaturePadHandle } from "@/components/SignaturePad";
import { submitMembershipApplication } from "@/lib/membershipApi";
import type { Gender, MembershipApplicationPayload, MembershipSubmissionResult, MembershipType } from "@/types/membership";

interface ApplicationFormState {
  nameChinese: string;
  nameEnglish: string;
  gender: Gender | "";
  dateOfBirth: string;
  contactNumber: string;
  email: string;
  residentialAddress: string;
  mailingAddress: string;
  membershipType: MembershipType;
  professionalBackground: string;
  declarationAccepted: boolean;
  website: string;
}

const initialState: ApplicationFormState = {
  nameChinese: "",
  nameEnglish: "",
  gender: "",
  dateOfBirth: "",
  contactNumber: "",
  email: "",
  residentialAddress: "",
  mailingAddress: "",
  membershipType: "ordinary",
  professionalBackground: "",
  declarationAccepted: false,
  website: "",
};

const fieldClass = "mt-2 h-12 w-full border border-border bg-white px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";
const textAreaClass = "mt-2 min-h-28 w-full resize-y border border-border bg-white px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

export function MembershipApplication() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const signatureRef = useRef<SignaturePadHandle>(null);
  const [form, setForm] = useState<ApplicationFormState>(initialState);
  const [mailingSame, setMailingSame] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<MembershipSubmissionResult | null>(null);
  const [submittedForm, setSubmittedForm] = useState<ApplicationFormState | null>(null);
  const [signaturePreview, setSignaturePreview] = useState("");
  const isEnglish = i18n.resolvedLanguage?.startsWith("en") ?? false;

  const maximumBirthDate = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date.toISOString().slice(0, 10);
  }, []);

  useEffect(() => () => {
    if (signaturePreview) URL.revokeObjectURL(signaturePreview);
  }, [signaturePreview]);

  const setField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = event.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setForm((current) => ({ ...current, [target.name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (signatureRef.current?.isEmpty() ?? true) {
      setError(t("application.errors.signatureRequired"));
      document.getElementById("signature-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!form.gender || !form.declarationAccepted) return;

    setSubmitting(true);
    try {
      const signature = await signatureRef.current!.exportCompressed();
      const signedAt = new Date().toISOString();
      const payload: MembershipApplicationPayload = {
        preferredLanguage: isEnglish ? "en" : "zh",
        nameChinese: form.nameChinese.trim(),
        nameEnglish: form.nameEnglish.trim(),
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim(),
        residentialAddress: form.residentialAddress.trim(),
        mailingAddress: mailingSame ? form.residentialAddress.trim() : form.mailingAddress.trim(),
        membershipType: form.membershipType,
        professionalBackground: form.professionalBackground.trim(),
        declarationAccepted: true,
        declarationVersion: "2026-09-13",
        signedAt,
        website: form.website,
      };
      const submission = await submitMembershipApplication(payload, signature);
      setSubmittedForm({ ...form, mailingAddress: payload.mailingAddress });
      setResult(submission);
      setSignaturePreview(URL.createObjectURL(signature));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : "SUBMISSION_FAILED";
      const knownErrors: Record<string, string> = {
        SUPABASE_NOT_CONFIGURED: t("application.errors.notConfigured"),
        SIGNATURE_REQUIRED: t("application.errors.signatureRequired"),
        RATE_LIMITED: t("application.errors.rateLimited"),
      };
      setError(knownErrors[message] ?? t("application.errors.submitFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  if (result && submittedForm) {
    const locale = isEnglish ? "en-AU" : "zh-CN";
    const paymentEmailHref = `mailto:member@cmeta.org.au?subject=${encodeURIComponent(
      t("application.payment.emailSubject", { reference: result.referenceNumber }),
    )}`;
    return (
      <section className="membership-application min-h-screen bg-[#f7f3ea] py-12 md:py-20">
        <div className="print-sheet mx-auto max-w-4xl bg-white px-6 py-10 shadow-[0_20px_70px_rgba(18,63,54,0.12)] md:px-14 md:py-14">
          <div className="screen-only mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-8">
            <div className="flex items-center gap-3 text-primary">
              <CheckCircle2 className="h-8 w-8 text-gold" />
              <div>
                <h1 className="font-serif text-3xl">{t("application.success.title")}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{t("application.success.desc")}</p>
              </div>
            </div>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-semibold text-white hover:bg-deep">
              <Printer className="h-4 w-4" /> {t("application.success.print")}
            </button>
          </div>

          <div className="print-header text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">CMETA Australia</p>
            <h2 className="mt-3 font-serif text-3xl text-primary md:text-4xl">{t("application.title")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t("application.associationName")}</p>
          </div>

          <section className="screen-only mt-10 border border-primary/20 bg-primary/[0.04] p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{t("application.payment.eyebrow")}</p>
                <h3 className="mt-2 font-serif text-2xl text-primary">{t("application.payment.title")}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/75">
                  {t("application.payment.instructions", { reference: result.referenceNumber })}
                </p>
              </div>
              <div className="bg-primary px-4 py-3 text-right text-white">
                <p className="text-[11px] uppercase tracking-wide text-white/70">{t("application.payment.amount")}</p>
                <p className="mt-1 font-semibold">{t(`application.membershipType.${submittedForm.membershipType}.fee`)}</p>
              </div>
            </div>
            <dl className="mt-6 grid gap-5 border-t border-primary/15 pt-5 sm:grid-cols-[2fr_1fr_1fr]">
              <SummaryItem label={t("application.payment.accountName")} value="Chinese Medicine External Therapies Association of Australia Inc." />
              <SummaryItem label={t("application.payment.bsb")} value="083-170" strong />
              <SummaryItem label={t("application.payment.accountNumber")} value="977631308" strong />
            </dl>
            <a href={paymentEmailHref} className="screen-only mt-6 inline-flex bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-deep">
              {t("application.payment.emailReceipt")}
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              {t("application.payment.emailLabel")}: member@cmeta.org.au
            </p>
          </section>

          <dl className="print-details mt-10 grid gap-x-10 gap-y-5 border-y border-border py-8 sm:grid-cols-2">
            <SummaryItem label={t("application.success.reference")} value={result.referenceNumber} strong />
            <SummaryItem label={t("application.success.submittedAt")} value={new Date(result.submittedAt).toLocaleString(locale)} />
            <SummaryItem label={t("application.fields.nameChinese")} value={submittedForm.nameChinese || t("application.success.notProvided")} />
            <SummaryItem label={t("application.fields.nameEnglish")} value={submittedForm.nameEnglish} />
            <SummaryItem label={t("application.fields.gender")} value={t(`application.gender.${submittedForm.gender}`)} />
            <SummaryItem label={t("application.fields.dateOfBirth")} value={new Date(`${submittedForm.dateOfBirth}T00:00:00`).toLocaleDateString(locale)} />
            <SummaryItem label={t("application.fields.contactNumber")} value={submittedForm.contactNumber} />
            <SummaryItem label={t("application.fields.email")} value={submittedForm.email} />
            <SummaryItem label={t("application.fields.residentialAddress")} value={submittedForm.residentialAddress} wide />
            <SummaryItem label={t("application.fields.mailingAddress")} value={submittedForm.mailingAddress} wide />
            <SummaryItem label={t("application.membershipType.label")} value={t(`application.membershipType.${submittedForm.membershipType}.title`)} />
            <SummaryItem label={t("application.fields.professionalBackground")} value={submittedForm.professionalBackground || t("application.success.notProvided")} wide />
          </dl>

          <section className="print-declaration mt-9 break-inside-avoid">
            <h3 className="font-serif text-xl text-primary">{t("application.declaration.title")}</h3>
            <p className="mt-3 leading-7 text-foreground/80">{t("application.declaration.text")}</p>
            <div className="mt-8 grid items-end gap-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("application.signature.title")}</p>
                {signaturePreview && <img src={signaturePreview} alt={t("application.signature.savedAlt")} className="print-signature mt-3 h-24 max-w-full object-contain object-left" />}
              </div>
              <SummaryItem label={t("application.signature.date")} value={new Date(result.submittedAt).toLocaleDateString(locale)} />
            </div>
          </section>

          <p className="print-footer mt-12 border-t border-border pt-5 text-xs text-muted-foreground">
            {t("application.success.footer", { reference: result.referenceNumber })}
          </p>
          <button type="button" onClick={() => navigate("/#membership")} className="screen-only mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> {t("application.back")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="membership-application bg-[#f7f3ea] py-12 md:py-20">
      <div className="container mx-auto px-5 md:px-8">
        <div className="mx-auto max-w-4xl">
          <button type="button" onClick={() => navigate("/#membership")} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> {t("application.back")}
          </button>
          <div className="mb-10 max-w-3xl">
            <p className="section-kicker">{t("application.eyebrow")}</p>
            <h1 className="section-title">{t("application.title")}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t("application.intro")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" noValidate={false}>
            <FormSection number="01" title={t("application.sections.personal")}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t("application.fields.nameChinese")} optional>
                  <input name="nameChinese" value={form.nameChinese} onChange={setField} autoComplete="name" className={fieldClass} />
                </Field>
                <Field label={t("application.fields.nameEnglish")}>
                  <input name="nameEnglish" value={form.nameEnglish} onChange={setField} autoComplete="name" required className={fieldClass} />
                </Field>
                <Field label={t("application.fields.gender")}>
                  <select name="gender" value={form.gender} onChange={setField} required className={fieldClass}>
                    <option value="">{t("application.fields.select")}</option>
                    {(["female", "male", "non_binary", "prefer_not_to_say"] as Gender[]).map((gender) => (
                      <option key={gender} value={gender}>{t(`application.gender.${gender}`)}</option>
                    ))}
                  </select>
                </Field>
                <Field label={t("application.fields.dateOfBirth")} hint={t("application.fields.ageHint")}>
                  <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={setField} max={maximumBirthDate} required className={fieldClass} />
                </Field>
                <Field label={t("application.fields.contactNumber")}>
                  <input type="tel" name="contactNumber" value={form.contactNumber} onChange={setField} autoComplete="tel" required minLength={6} maxLength={30} className={fieldClass} />
                </Field>
                <Field label={t("application.fields.email")}>
                  <input type="email" name="email" value={form.email} onChange={setField} autoComplete="email" required maxLength={254} className={fieldClass} />
                </Field>
              </div>
            </FormSection>

            <FormSection number="02" title={t("application.sections.address")}>
              <div className="space-y-5">
                <Field label={t("application.fields.residentialAddress")}>
                  <textarea name="residentialAddress" value={form.residentialAddress} onChange={setField} autoComplete="street-address" required maxLength={500} className={textAreaClass} />
                </Field>
                <label className="flex items-start gap-3 text-sm text-foreground/80">
                  <input type="checkbox" checked={mailingSame} onChange={(event) => setMailingSame(event.target.checked)} className="mt-0.5 h-4 w-4 accent-primary" />
                  {t("application.fields.mailingSame")}
                </label>
                {!mailingSame && (
                  <Field label={t("application.fields.mailingAddress")}>
                    <textarea name="mailingAddress" value={form.mailingAddress} onChange={setField} autoComplete="postal-code" required maxLength={500} className={textAreaClass} />
                  </Field>
                )}
              </div>
            </FormSection>

            <FormSection number="03" title={t("application.sections.membership")}>
              <fieldset className="grid gap-4 md:grid-cols-2">
                <legend className="sr-only">{t("application.membershipType.label")}</legend>
                {(["ordinary", "professional"] as MembershipType[]).map((type) => (
                  <article key={type} className={`border transition ${form.membershipType === type ? "border-primary bg-primary/[0.04] ring-1 ring-primary" : "border-border bg-white hover:border-primary/50"}`}>
                    <label className="block cursor-pointer p-5">
                      <span className="flex items-start gap-3">
                        <input type="radio" name="membershipType" value={type} checked={form.membershipType === type} onChange={setField} className="mt-1 h-4 w-4 accent-primary" />
                        <span>
                          <strong className="block text-lg text-primary">{t(`application.membershipType.${type}.title`)}</strong>
                          <span className="mt-1 block text-sm font-semibold text-gold">{t(`application.membershipType.${type}.fee`)}</span>
                          <span className="mt-3 block text-sm leading-6 text-muted-foreground">{t(`application.membershipType.${type}.desc`)}</span>
                        </span>
                      </span>
                    </label>
                    <MembershipTypeDetails type={type} />
                  </article>
                ))}
              </fieldset>
              <div className="screen-only mt-5 border-l-2 border-gold px-5 py-3 text-sm leading-6 text-foreground/75">
                <strong className="block text-primary">{t("application.membershipType.validityTitle")}</strong>
                {t("application.membershipType.validity")}
              </div>
              <div className="mt-6">
                <Field label={t("application.fields.professionalBackground")} optional hint={t("application.fields.backgroundHint")}>
                  <textarea name="professionalBackground" value={form.professionalBackground} onChange={setField} maxLength={2000} className={textAreaClass} />
                </Field>
              </div>
            </FormSection>

            <FormSection number="04" title={t("application.sections.declaration")}>
              <div id="signature-section">
                <h3 className="font-semibold text-primary">{t("application.declaration.title")}</h3>
                <p className="mt-3 leading-7 text-foreground/75">{t("application.declaration.text")}</p>
                <label className="mt-5 flex items-start gap-3 border-y border-border py-4 text-sm leading-6">
                  <input type="checkbox" name="declarationAccepted" checked={form.declarationAccepted} onChange={setField} required className="mt-1 h-4 w-4 shrink-0 accent-primary" />
                  {t("application.declaration.accept")}
                </label>
                <div className="mt-7">
                  <p className="mb-2 font-semibold text-primary">{t("application.signature.title")} <span className="text-red-700">*</span></p>
                  <p className="mb-4 text-sm text-muted-foreground">{t("application.signature.hint")}</p>
                  <SignaturePad ref={signatureRef} />
                </div>
              </div>
            </FormSection>

            <div className="hidden" aria-hidden="true">
              <label>Website<input name="website" value={form.website} onChange={setField} tabIndex={-1} autoComplete="off" /></label>
            </div>

            {error && <div role="alert" className="border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">{error}</div>}
            <div className="flex flex-col-reverse items-start justify-between gap-5 border-t border-primary/15 pt-7 sm:flex-row sm:items-center">
              <p className="max-w-xl text-xs leading-5 text-muted-foreground">{t("application.privacy")}</p>
              <button type="submit" disabled={submitting} className="inline-flex min-w-40 items-center justify-center gap-2 bg-primary px-7 py-4 font-semibold text-white transition hover:bg-deep disabled:cursor-not-allowed disabled:opacity-60">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? t("application.submitting") : t("application.submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function FormSection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <section className="bg-white p-6 shadow-[0_12px_40px_rgba(18,63,54,0.06)] md:p-9">
      <div className="mb-7 flex items-center gap-4 border-b border-border pb-5">
        <span className="font-serif text-2xl text-gold">{number}</span>
        <h2 className="font-serif text-2xl text-primary">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, optional, children }: { label: string; hint?: string; optional?: boolean; children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <label className="block text-sm font-semibold text-primary">
      {label} {!optional && <span className="text-red-700">*</span>}
      {optional && <span className="ml-2 font-normal text-muted-foreground">{t("application.fields.optional")}</span>}
      {children}
      {hint && <span className="mt-2 block text-xs font-normal leading-5 text-muted-foreground">{hint}</span>}
    </label>
  );
}

function SummaryItem({ label, value, wide, strong }: { label: string; value: string; wide?: boolean; strong?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`mt-1 break-words leading-7 ${strong ? "font-bold text-primary" : "text-foreground"}`}>{value}</dd>
    </div>
  );
}

function MembershipTypeDetails({ type }: { type: MembershipType }) {
  const { t } = useTranslation();
  const requirements = t(`application.membershipType.${type}.requirements`, { returnObjects: true }) as string[];
  const benefits = t(`application.membershipType.${type}.benefits`, { returnObjects: true }) as string[];

  return (
    <details className="screen-only group border-t border-border px-5 py-4">
      <summary className="cursor-pointer list-none text-sm font-semibold text-primary marker:hidden">
        <span className="flex items-center justify-between gap-3">
          {t("application.membershipType.viewDetails")}
          <span aria-hidden="true" className="text-xl font-normal text-gold transition-transform group-open:rotate-45">＋</span>
        </span>
      </summary>
      <div className="mt-4 grid gap-5 text-sm leading-6 text-foreground/75">
        <div>
          <h4 className="font-semibold text-primary">{t("application.membershipType.requirementsTitle")}</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {requirements.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary">{t("application.membershipType.benefitsTitle")}</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {benefits.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </details>
  );
}
