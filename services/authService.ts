import { apiClient, apiClientNoAuth } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export const login = async (data: LoginData): Promise<boolean> => {
  try {
    const response = await apiClient.post<LoginResponse>("users/login", data);

    // Save token to AsyncStorage
    // if()
    const token = response.data.token;

    if (token) {
      await AsyncStorage.setItem("authToken", token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};



export const registerUser = async (userData: RegistrationData) => {
  try {
    const response = await apiClientNoAuth.post('users/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};



export const logout = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    return false;
  }
};

export const getUserToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      return "none";
    }

    return token;
  } catch (error) {
    // console.error("Error fetching user info:", error);
    throw error;
  }
};

// export const getUserInfo = async (token: string) => {
//   try {
//     // Decode the token
//     const decoded: DecodedToken = jwtDecode(token);

//     // Extract userId and store it in AsyncStorage
//     if (decoded.userId) {
//       await AsyncStorage.setItem("userId", decoded.userId.toString());
//       console.log("User ID saved successfully.");
//     } else {
//       console.error("User ID not found in token.");
//     }
//   } catch (error) {
//     console.error("Error decoding token or saving userId:", error);
//   }
// };
