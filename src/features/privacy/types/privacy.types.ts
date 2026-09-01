export type LegalDocumentType = "privacy" | "terms" | "cookies" | "disclaimer";

export type EditorialStatus =
  "approved" | "draft" | "rejected" | "pending_review";

export type PublicationStatus =
  "published" | "draft" | "archived" | "scheduled";

export type Platform = "web" | "ios" | "android";

export type TextDirection = "ltr" | "rtl";

export interface LexicalNode {
  children: LexicalChild[];
  direction: TextDirection;
  format: string;
  indent: number;
  type: string;
  version: number;
}

export interface LexicalChild {
  children?: LexicalChild[];
  text?: string;
  type: string;
  version: number;
  direction?: TextDirection;
  format?: string;
  indent?: number;
}

export interface LegalDocumentContent {
  root: LexicalNode;
}

export interface DocumentAudience {
  platforms: Platform[];
  authenticationStates: string[];
  startsAt_tz: string;
  endsAt_tz: string;
  timezone: string;
}

export interface LegalDocumentData {
  createdAt: string;
  updatedAt: string;
  title: string;
  key: string;
  type: LegalDocumentType;
  summary: string;
  content: LegalDocumentContent;
  jurisdiction: string;
  legalVersion: string;
  effectiveAt: string;
  audience: DocumentAudience;
  editorialStatus: EditorialStatus;
  _status: PublicationStatus;
  publicationEndsAt_tz: string;
  publicationStartsAt_tz: string;
  id: string;
}

export interface LegalDocument {
  contractVersion: string;
  data: LegalDocumentData;
}

export type CreateLegalDocumentInput = Omit<LegalDocument, "data"> & {
  data: Omit<
    LegalDocumentData,
    "id" | "createdAt" | "updatedAt" | "_status"
  > & {
    _status?: PublicationStatus;
  };
};

export type UpdateLegalDocumentInput = Partial<Omit<LegalDocument, "data">> & {
  data?: Partial<Omit<LegalDocumentData, "id" | "createdAt">>;
};

export interface LegalDocumentListResponse {
  data: LegalDocument[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
