import axios from 'axios';
import { ProviderCountItem } from '@/type/providerType'; // Đường dẫn tùy thuộc vào nơi bạn lưu type
import { apiClient, apiClientNoAuth } from "@/utils/api";
// Thay bằng URL của API

export const getProviders = async (): Promise<ProviderCountItem[]> => {
  try {
    const response = await apiClientNoAuth.get(`/products/count-by-provider`);
    return response.data as ProviderCountItem[];
  } catch (error) {
    console.error('Error fetching providers:', error);
    throw error; // Throw lỗi để xử lý ở nơi gọi
  }
};
