import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = 'http://100.102.83.94:8088/api/v1/';

// Set up the token
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjAzMzMzMzMzMzMiLCJ1c2VySWQiOjUsInN1YiI6IjAzMzMzMzMzMzMiLCJleHAiOjE3MzEwODU5NTh9.wH0EYeHywKGDARU_sFTVy32x7qvuUXsb4JtShOBzQwE';

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
    const response = await apiClient.get('products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
