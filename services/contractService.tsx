import { Contract, ContractResponse } from "@/type/contractType";
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