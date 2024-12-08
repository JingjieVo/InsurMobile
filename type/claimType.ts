export interface CreateClaimRequest {
  contractId: number;
  amountClaim: number;
  note: string;
  description: string;
  upload: string; // URL hoặc tên file upload
  name: string;
  phone: string;
  email: string;
  bankAccount: string;
  bankName: string;
  bankBranch: string;
  bankNameOwner: string;
}

export interface Claim {
  id: number;
  contractId: number;
  status: number; // 0 = Pending, 1 = Approved, etc. (tuỳ theo logic của bạn)
  amountClaim: number;
  compensationAmount: number;
  note: string;
  description: string;
  upload: string; // URL hoặc tên file upload
  name: string;
  phone: string;
  email: string;
  requireUpdateStatus: null | string;
  bankAccount: string;
  bankName: string;
  bankBranch: string;
  bankNameOwner: string | null; // Có thể null
  createdBy: number;
  modifiedBy: number;
  createdAt: string; // ISO date string
  modifiedAt: string; // ISO date string
}

// Định nghĩa cho response từ API
export interface ClaimsResponse {
  message: string;
  status: string; // "OK", "ERROR", etc.
  data: Claim[]; // Danh sách claims
}
