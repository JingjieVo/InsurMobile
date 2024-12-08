export interface ProviderCountItem {
    providerId: number;
    providerName: string;
    countProduct: number;
  }
  

export interface Provider {
  id: number;
  address: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  avatar?: "";
}