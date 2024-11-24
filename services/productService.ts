import { ProductDetailResponse, ProductsResponse } from "@/type/productType";
import { apiClient } from "@/utils/api";


// Set up the token
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA0NDQ0NDQ0NDQiLCJ1c2VySWQiOjcsInN1YiI6IjA0NDQ0NDQ0NDQiLCJleHAiOjE3MzE4NjAyNDR9.XvZvy_LVRZN1mckpTWx7FtcUz0H2W0tQRhS-irZAZIE';
const TOKEN_USER = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA0NDQ0NDQ0NDQiLCJ1c2VySWQiOjcsInN1YiI6IjA0NDQ0NDQ0NDQiLCJleHAiOjE3MzI3MDAzODN9.10HakOi_saciXPBVHaYekdw8N63fMLhJZ0TPB1WL7Gs'
// Create an Axios instance with default settings


// Define the service function to get products
export const getProducts = async  () : Promise<ProductsResponse> => {
  try {
    const response = await apiClient.get('products/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id: string) : Promise<ProductDetailResponse> => {
  try {
    const response = await apiClient.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by id ${id}:`, error);
    throw error;
  }
};