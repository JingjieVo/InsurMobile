interface LoginData {
  phone_number: string;
  password: string;
  role_id: number;
}

interface LoginResponse {
  message: string;
  // status: string;
  token: string; // Assuming a token is returned on successful login
}
interface User {
  id: number;
  name: string;
  email: string;
  // Add other user fields as needed
}

interface DecodedToken {
  userId: string;
  phoneNumber: string; // Or `number`, depending on your backend
  // Add other fields that may be in the token payload if needed
}

interface UserResponse {
  message: string; // Thông báo từ API
  status: string;  // Trạng thái phản hồi
  data: UserData;  // Chi tiết người dùng
}

interface UserData {
  fullName: string;     // Tên đầy đủ của người dùng
  phoneNumber: string;  // Số điện thoại
  address: string;      // Địa chỉ
  email: string;        // Email
  dateOfBirth: string | null; // Ngày sinh (có thể null)
  avatar: string;       // Tên file avatar
}

interface UserProfile {
  fullName: string;
  phoneNumber: string;
  address: string;
  email: string;
  dateOfBirth: string | null;
  avatar: string;
}
interface UserProfileResponse {
  message: string;
  status: string;
  data: UserProfile;
}



interface RegistrationData {
  fullname: string;
  phone_number: string;
  address: string;
  password: string;
  email: string;
  retype_password: string;
  date_of_birth: string;
  avatar: string;
  role_id: number;
}
