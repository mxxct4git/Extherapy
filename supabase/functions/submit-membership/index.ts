import { createClient } from "npm:@supabase/supabase-js@2";

const allowedGenders = new Set(["female", "male", "non_binary", "prefer_not_to_say"]);
const allowedMembershipTypes = new Set(["ordinary", "professional"]);
const allowedLanguages = new Set(["zh", "en"]);

function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") || "*";
  const configuredOrigins = (Deno.env.get("ALLOWED_ORIGINS") || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const allowedOrigin = configuredOrigins.length === 0 || configuredOrigins.includes(origin) ? origin : configuredOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const configuredOrigins = (Deno.env.get("ALLOWED_ORIGINS") || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return !origin || configuredOrigins.length === 0 || configuredOrigins.includes(origin);
}

function json(request: Request, body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(request), "Content-Type": "application/json; charset=utf-8" },
  });
}

function clean(value: unknown, maximum: number, required = true) {
  if (typeof value !== "string") throw new Error("INVALID_FORM");
  const output = value.trim();
  if ((required && !output) || output.length > maximum) throw new Error("INVALID_FORM");
  return output || null;
}

function isAdult(dateOfBirth: string) {
  const birthDate = new Date(`${dateOfBirth}T00:00:00Z`);
  if (Number.isNaN(birthDate.getTime())) return false;
  const today = new Date();
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
  const beforeBirthday = today.getUTCMonth() < birthDate.getUTCMonth()
    || (today.getUTCMonth() === birthDate.getUTCMonth() && today.getUTCDate() < birthDate.getUTCDate());
  if (beforeBirthday) age -= 1;
  return age >= 18 && age <= 120;
}

function referenceNumber() {
  const dateParts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const datePart = (type: "year" | "month" | "day") =>
    dateParts.find((part) => part.type === type)?.value || "";
  const day = `${datePart("year")}${datePart("month")}${datePart("day")}`;
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `CMETA-${day}-${suffix}`;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(request) });
  if (request.method !== "POST") return json(request, { error: "METHOD_NOT_ALLOWED" }, 405);
  if (!isAllowedOrigin(request)) return json(request, { error: "ORIGIN_NOT_ALLOWED" }, 403);

  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 750_000) return json(request, { error: "PAYLOAD_TOO_LARGE" }, 413);

    const form = await request.formData();
    const applicationValue = form.get("application");
    const signatureValue = form.get("signature");
    if (typeof applicationValue !== "string" || !(signatureValue instanceof File)) {
      return json(request, { error: "INVALID_FORM" }, 400);
    }

    const input = JSON.parse(applicationValue) as Record<string, unknown>;
    if (input.website) return json(request, { error: "INVALID_FORM" }, 400);
    if (input.declarationAccepted !== true || input.declarationVersion !== "2026-09-13") {
      return json(request, { error: "DECLARATION_REQUIRED" }, 400);
    }
    if (!allowedLanguages.has(String(input.preferredLanguage))) throw new Error("INVALID_FORM");
    if (!allowedGenders.has(String(input.gender))) throw new Error("INVALID_FORM");
    if (!allowedMembershipTypes.has(String(input.membershipType))) throw new Error("INVALID_FORM");

    const dateOfBirth = clean(input.dateOfBirth, 10)!;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) || !isAdult(dateOfBirth)) {
      return json(request, { error: "APPLICANT_MUST_BE_ADULT" }, 400);
    }
    const email = clean(input.email, 254)!.toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(request, { error: "INVALID_EMAIL" }, 400);
    if (signatureValue.type !== "image/webp" || signatureValue.size < 100 || signatureValue.size > 512_000) {
      return json(request, { error: "INVALID_SIGNATURE" }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("SERVER_NOT_CONFIGURED");
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const nameChinese = clean(input.nameChinese, 120, false);
    const nameEnglish = clean(input.nameEnglish, 120);
    const contactNumber = clean(input.contactNumber, 30);
    const residentialAddress = clean(input.residentialAddress, 500);
    const mailingAddress = clean(input.mailingAddress, 500);
    const professionalBackground = clean(input.professionalBackground, 2000, false);
    const duplicateWindow = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recentApplications, error: duplicateCheckError } = await supabase
      .from("membership_applications")
      .select("id")
      .eq("email", email)
      .gte("submitted_at", duplicateWindow)
      .limit(1);
    if (duplicateCheckError) throw duplicateCheckError;
    if (recentApplications && recentApplications.length > 0) {
      return json(request, { error: "RATE_LIMITED" }, 429);
    }

    const applicationId = crypto.randomUUID();
    const reference = referenceNumber();
    const year = new Date().getUTCFullYear();
    const signaturePath = `${year}/${applicationId}/signature.webp`;
    const signatureBytes = new Uint8Array(await signatureValue.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("membership-signatures")
      .upload(signaturePath, signatureBytes, { contentType: "image/webp", upsert: false });
    if (uploadError) throw uploadError;

    const row = {
      id: applicationId,
      reference_number: reference,
      status: "submitted",
      preferred_language: input.preferredLanguage,
      name_chinese: nameChinese,
      name_english: nameEnglish,
      gender: input.gender,
      date_of_birth: dateOfBirth,
      contact_number: contactNumber,
      email,
      residential_address: residentialAddress,
      mailing_address: mailingAddress,
      membership_type: input.membershipType,
      professional_background: professionalBackground,
      declaration_accepted: true,
      declaration_version: input.declarationVersion,
      signed_at: new Date().toISOString(),
      signature_storage_path: signaturePath,
      signature_mime_type: "image/webp",
      signature_size_bytes: signatureValue.size,
      payment_status: "pending",
    };

    const { data, error: insertError } = await supabase
      .from("membership_applications")
      .insert(row)
      .select("id, reference_number, submitted_at")
      .single();

    if (insertError) {
      await supabase.storage.from("membership-signatures").remove([signaturePath]);
      throw insertError;
    }

    return json(request, {
      applicationId: data.id,
      referenceNumber: data.reference_number,
      submittedAt: data.submitted_at,
    }, 201);
  } catch (error) {
    console.error("Membership submission failed", error);
    const message = error instanceof Error && error.message === "INVALID_FORM" ? "INVALID_FORM" : "SUBMISSION_FAILED";
    return json(request, { error: message }, message === "INVALID_FORM" ? 400 : 500);
  }
});
