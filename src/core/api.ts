import axios from "axios";
import { url_pam } from "../config";
const api = axios.create({
  baseURL: url_pam, // Thay thế bằng API của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor cho request để tự động gắn token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response để kiểm tra lỗi 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Chuyển hướng về trang chủ
    }
    return Promise.reject(error);
  }
);

export default api;
