import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = 'http://100.102.83.94:8088/api/v1/';

// Set up the token
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA0NDQ0NDQ0NDQiLCJ1c2VySWQiOjcsInN1YiI6IjA0NDQ0NDQ0NDQiLCJleHAiOjE3MzE4NjAyNDR9.XvZvy_LVRZN1mckpTWx7FtcUz0H2W0tQRhS-irZAZIE';
const TOKEN_USER = ''
// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Define the service function to get products
export const getProducts = async () => {
  try {
    const response = await apiClient.get('products/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await apiClient.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by id ${id}:`, error);
    throw error;
  }
};