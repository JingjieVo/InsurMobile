import { Contract, ContractDetailResponse, ContractResponse } from "@/type/contractType";
import { apiClient } from "@/utils/api";


export const createContract = async (contractData: Contract) => {
  try {
    const response = await apiClient.post('/contracts', contractData);
    return response.data;
  } catch (error) {
    console.error('Error creating contract:', error);
    throw error;
  }
};

export const getUserContracts = async (): Promise<ContractResponse> => {
    try {
      const response = await apiClient.get('contracts/user');
      return response.data;
    } catch (error) {
      console.error("Error fetching user contracts:", error);
      throw error;
    }
  };


export const getContractDetail = async (contractId: number): Promise<ContractDetailResponse> => {
  try {
    const response = await apiClient.get(`/contracts/${contractId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contract detail:', error);
    throw error;
  }
};
