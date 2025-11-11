import api from "../core/api";

// Lấy danh sách tất cả công ty
export async function getAllCompanies() {
  try {
    const response = await api.get(`/companies`);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Lấy chi tiết công ty theo id
export async function getCompanyById(id: string) {
  try {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Lấy công ty chính (primary)
export async function getPrimaryCompany() {
  try {
    const response = await api.get(`/companies/primary`);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Tạo mới công ty
export async function createCompany(data: any) {
  try {
    const response = await api.post(`/companies`, data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Cập nhật công ty theo id
export async function updateCompany(id: string, data: any) {
  try {
    const response = await api.put(`/companies/${id}`, data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Xoá công ty theo id
export async function deleteCompany(id: string) {
  try {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Hàm xử lý lỗi dùng chung
function handleApiError(error: any) {
  if (error.response) {
    console.error("Error response data:", error.response.data);
    return error.response.data;
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }
}
