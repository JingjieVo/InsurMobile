import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from './constant';

// Tạo một instance của axios
export const apiClient = axios.create({
  baseURL: ENV.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tạo interceptor để thêm Authorization token vào header mỗi lần gọi API
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Lấy token từ AsyncStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Instance không yêu cầu auth token
export const apiClientNoAuth = axios.create({
  baseURL: ENV.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
