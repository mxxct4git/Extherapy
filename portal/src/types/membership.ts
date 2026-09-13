export type MembershipType = "ordinary" | "professional";

export type Gender = "female" | "male" | "non_binary" | "prefer_not_to_say";

export interface MembershipApplicationPayload {
  preferredLanguage: "zh" | "en";
  nameChinese: string;
  nameEnglish: string;
  gender: Gender;
  dateOfBirth: string;
  contactNumber: string;
  email: string;
  residentialAddress: string;
  mailingAddress: string;
  membershipType: MembershipType;
  professionalBackground: string;
  declarationAccepted: true;
  declarationVersion: "2026-09-13";
  signedAt: string;
  website: string;
}

export interface MembershipSubmissionResult {
  applicationId: string;
  referenceNumber: string;
  submittedAt: string;
}
