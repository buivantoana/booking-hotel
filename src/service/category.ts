import api from "../core/api";

// Lấy danh sách tất cả category
export async function getAllCategories() {
  try {
    const response = await api.get(`/categories`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
}

// Lấy chi tiết category theo id
export async function getCategoryById(id: string) {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
}

// Tạo mới category
export async function createCategory(data: { name: string; slug: string }) {
  try {
    const response = await api.post(`/categories`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
}

// Cập nhật category theo id
export async function updateCategory(
  id: string,
  data: { name: string; slug: string }
) {
  try {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
}

// Xóa category theo id
export async function deleteCategory(id: string) {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
}
