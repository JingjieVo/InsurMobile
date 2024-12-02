// interfaces/Contract.ts
export interface Contract {
  id: number;
  categoryName: string;
  productName: string;
  providerName: string;
  status: number;
  price: number;
  startDate: string;
  endDate: string;
}

export interface ContractSubDetail {
  createdAt: string;
  modifiedAt: string;
  id: number;
  productId: number;
  productName: string;
  productDescription: string;
  applicableObject: string;
  scope: string;
  exclusion: string;
  name: string;
  dob: string;
  gender: string;
  identification: string;
  phone: string;
  email: string;
  address: string;
  createdBy: number;
  modifiedBy: number;
  contractMainTerms: ContractTerm[];
  contractSideTerms: ContractTerm[];
}

export interface ContractDetail {
  createdAt: string;
  modifiedAt: string;
  id: number;
  status: number;
  startDate: string;
  endDate: string;
  name: string;
  dob: string;
  gender: string;
  identification: string;
  phone: string;
  email: string;
  address: string;
  price: number;
  createdBy: number;
  modifiedBy: number;
  contractDetail: ContractSubDetail;
}

interface ContractTerm {
  id: number;
  name: string;
  description: string;
  amount: number;
  price?: number | null;
}



export interface ContractResponse {
  message: string;
  status: string;
  data: Contract[];
}
export interface ContractDetailResponse {
  message: string; // Thông điệp từ API
  status: string;  // Trạng thái phản hồi, ví dụ: "OK", "ERROR"
  data: ContractDetail; // Dữ liệu chi tiết hợp đồng
}
