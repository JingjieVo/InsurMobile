import { CategoryResponse } from "@/type/categoryType";
import { apiClient } from "@/utils/api";

export const getCategories = async () : Promise<CategoryResponse> => {
    try {
      const response = await apiClient.get('categories/list');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  