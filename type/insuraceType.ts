export interface InsuranceContract {
    id: string;
    contractNumber: string;
    insuredPerson: string;
    expiryDate: string;
    status: 'active' | 'inactive';
    benefits: InsuranceBenefit[];
  }
  
  export interface InsuranceBenefit {
    name: string;
    description: string;
    amount: number;
    details?: string;
  }
  
  