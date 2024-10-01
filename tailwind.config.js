/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Điều này cho phép Tailwind biết những file nào cần theo dõi để áp dụng class
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Bạn có thể tùy chỉnh theme ở đây
      colors: {
        primary: "#1E40AF",  // Thêm màu primary ví dụ
        secondary: "#D97706",
      },
    },
  },
  plugins: [],
};
