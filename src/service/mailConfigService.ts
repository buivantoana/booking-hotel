import api from "../core/api";

// Lấy danh sách tất cả email
export async function getAllMailConfigs() {
  try {
    const response = await api.get(`/mail-config`);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Lấy chi tiết email theo id
export async function getMailConfigById(id: string) {
  try {
    const response = await api.get(`/mail-config/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Tạo mới cấu hình email
export async function createMailConfig(data: any) {
  try {
    const response = await api.post(`/mail-config`, data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Cập nhật cấu hình email theo id
export async function updateMailConfig(id: string, data: any) {
  try {
    const response = await api.put(`/mail-config/${id}`, data);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Xoá cấu hình email theo id
export async function deleteMailConfig(id: string) {
  try {
    const response = await api.delete(`/mail-config/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

// Đặt email là primary
export async function setPrimaryMailConfig(id: string) {
  try {
    const response = await api.patch(`/mail-config/${id}/set-primary`);
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
