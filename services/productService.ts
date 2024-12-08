import { ProductDetailResponse, ProductsResponse } from "@/type/productType";
import { apiClient } from "@/utils/api";


// Set up the token
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA0NDQ0NDQ0NDQiLCJ1c2VySWQiOjcsInN1YiI6IjA0NDQ0NDQ0NDQiLCJleHAiOjE3MzE4NjAyNDR9.XvZvy_LVRZN1mckpTWx7FtcUz0H2W0tQRhS-irZAZIE';
const TOKEN_USER = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjA0NDQ0NDQ0NDQiLCJ1c2VySWQiOjcsInN1YiI6IjA0NDQ0NDQ0NDQiLCJleHAiOjE3MzMwNjY0NDd9.46kTDTmHC7MqSHmz9iRvlBzYtpnjNJ9y_mq6mr2dWlk'
// Create an Axios instance with default settings


// Define the service function to get products
export const getProducts = async (
  providerIds: string | string[],
  productName: string | string[]
): Promise<ProductsResponse> => {
  // Khởi tạo URL cơ bản
  let url = 'products/list';

  // Xử lý tham số query
  const queryParams: Record<string, string> = {};

  // Xử lý `providerIds`
  if (Array.isArray(providerIds) && providerIds.length > 0) {
    queryParams.providerId = providerIds.join(','); // Nối mảng thành chuỗi
  } else if (typeof providerIds === 'string' && providerIds.trim().length > 0) {
    queryParams.providerId = providerIds.trim(); // Sử dụng chuỗi trực tiếp
  }

  // Xử lý `productName`
  if (Array.isArray(productName) && productName.length > 0) {
    queryParams.productName = productName.join(','); // Nối mảng thành chuỗi
  } else if (typeof productName === 'string' && productName.trim().length > 0) {
    queryParams.productName = productName.trim(); // Sử dụng chuỗi trực tiếp
  }

  // Gắn các tham số query vào URL
  const queryString = new URLSearchParams(queryParams).toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  // Gọi API
  try {
    const response = await apiClient.get(url);
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