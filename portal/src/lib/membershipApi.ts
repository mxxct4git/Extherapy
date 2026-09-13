import type { MembershipApplicationPayload, MembershipSubmissionResult } from "@/types/membership";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export async function submitMembershipApplication(
  application: MembershipApplicationPayload,
  signature: Blob,
): Promise<MembershipSubmissionResult> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  const form = new FormData();
  form.append("application", JSON.stringify(application));
  form.append("signature", signature, "signature.webp");

  const response = await fetch(`${supabaseUrl}/functions/v1/submit-membership`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: form,
  });

  const result = (await response.json().catch(() => null)) as
    | (Partial<MembershipSubmissionResult> & { error?: string })
    | null;

  if (!response.ok || !result?.applicationId || !result.referenceNumber || !result.submittedAt) {
    throw new Error(result?.error || "SUBMISSION_FAILED");
  }

  return result as MembershipSubmissionResult;
}
