// interfaces/Contract.ts
export interface Term {
    id: number;
  }
  
  export interface ContractDetailDTO {
    productId: number;
    name: string;
    dob: string;
    gender: string;
    identification: string;
    phone: string;
    email: string;
    address: string;
    mainTerms: Term[];
    sideTerms: Term[];
  }
  
  export interface Contract {
    startDate: string;
    endDate: string;
    name: string;
    dob: string;
    gender: string;
    identification: string;
    phone: string;
    email: string;
    address: string;
    contractDetailDTO: ContractDetailDTO;
  }
  
  export interface ContractSummary {
    id: number;
    categoryName: string;
    productName: string;
    providerName: string;
    status: number;
    price: number;
    startDate: string;
    endDate: string;
  }
  
  export interface ContractResponse {
    message: string;
    status: string;
    data: ContractSummary[];
  }