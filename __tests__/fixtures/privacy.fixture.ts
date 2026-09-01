import type {
  LegalDocument,
  LegalDocumentData,
} from "@/features/privacy/types/privacy.types";

export const buildPrivacyDocumentData = (
  overrides: Partial<LegalDocumentData> = {},
): LegalDocumentData => ({
  id: "legal-privacy",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-07-01T00:00:00.000Z",
  title: "Política de Privacidad",
  key: "privacy_policy",
  type: "privacy",
  summary: "Como recopilamos, usamos y protegemos tu informacion.",
  content: {
    root: {
      children: [
        {
          type: "heading",
          version: 1,
          direction: "ltr",
          children: [{ type: "text", version: 1, text: "Introduccion" }],
        },
        {
          type: "paragraph",
          version: 1,
          direction: "ltr",
          children: [
            {
              type: "text",
              version: 1,
              text: "Nos preocupa tu privacidad y la de tus datos.",
            },
          ],
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  },
  jurisdiction: "MX",
  legalVersion: "1.0.0",
  effectiveAt: "2026-01-01T00:00:00.000Z",
  audience: {
    platforms: ["ios", "android", "web"],
    authenticationStates: ["guest", "authenticated"],
    startsAt_tz: "2026-01-01T00:00:00.000Z",
    endsAt_tz: "2099-01-01T00:00:00.000Z",
    timezone: "America/Mexico_City",
  },
  editorialStatus: "approved",
  _status: "published",
  publicationEndsAt_tz: "2099-01-01T00:00:00.000Z",
  publicationStartsAt_tz: "2026-01-01T00:00:00.000Z",
  ...overrides,
});

export const buildPrivacyDocument = (
  overrides: Partial<LegalDocumentData> = {},
): LegalDocument => ({
  contractVersion: "1.0.0",
  data: buildPrivacyDocumentData(overrides),
});

export const privacyDocumentFixture: LegalDocument = buildPrivacyDocument();

export const emptyPrivacyDocumentFixture: Partial<LegalDocument> = {
  contractVersion: "1.0.0",
};
