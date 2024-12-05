import { ClaimsResponse, CreateClaimRequest } from "@/type/claimType";
import { apiClient } from "@/utils/api";

export const createClaim = async (
  claimData: CreateClaimRequest
): Promise<void> => {
  try {
    const response = await apiClient.post(`claims`, claimData);

    console.log("Claim created successfully:", response.data);
  } catch (error) {
    console.error("Error creating claim:", error);
    throw error; // Throw lỗi để xử lý ở nơi gọi hàm
  }
};

export const getClaims = async (): Promise<ClaimsResponse> => {
  try {
    const response = await apiClient.get(`claims/user`);
    return response.data; // Trả về dữ liệu dạng ClaimsResponse
  } catch (error) {
    console.error("Error fetching claims:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
