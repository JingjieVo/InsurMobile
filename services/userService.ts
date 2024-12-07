import { apiClient } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const getUserInfo = async () => {
    try {
      // Decode the token
      const userToken = await AsyncStorage.getItem("authToken")
      if(userToken) {
        const decoded: DecodedToken = jwtDecode(userToken);
        const userId = decoded.userId;
        const response = await apiClient.get<UserResponse>(`users/${userId}`);

        return response.data.data;
      }
      return null;
  
      

    } catch (error) {
      return null
    }
  };
  
  
  export const getUserProfile = async () => {
    try {
      // Decode the token
      const userToken = await AsyncStorage.getItem("authToken")
      if(userToken) {
        const decoded: DecodedToken = jwtDecode(userToken);
        const userId = decoded.userId;
        const response = await apiClient.get<UserResponse>(`users/${userId}`);

        return response.data;
      }
      return null;
  
      

    } catch (error) {
      return null
    }
  };
  
  export const updateUserProfile = async (profileData: FormData): Promise<UserProfileResponse> => {
    try {
      const response = await apiClient.put('user/profile', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };
  
  