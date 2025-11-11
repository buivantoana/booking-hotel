import api from "../core/api";

export type ProductData = {
  name: string;
  description?: string;
  avatar: string;
  subscribers?: string; // ví dụ: "1M+"
  views?: string;       // ví dụ: "500M+"
  videos?: string;      // ví dụ: "150M+"
  socials?: {
    youtube?: string;
    facebook?: string;
    tiktok?: string;
    instagram?: string;
  };
};

function handleError(error: any) {
  if (error.response) {
    console.error("Error response:", error.response.data);
    return error.response.data;
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Request setup error:", error.message);
  }
  return { status: 1, message: "Lỗi kết nối" };
}

export async function getAllProducts(query?: any) {
  if (query && Object.keys(query).length > 0) {
    query = new URLSearchParams(query).toString();
  }
  try {
    const res = await api.get(`/products?${query || ""}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}

export async function getProductByID(id: string) {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}

export async function createProduct(data: ProductData) {
  try {
    delete data?._id
    const res = await api.post("/products", data);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}

export async function updateProduct(id: string, data: ProductData) {
  try {
    const res = await api.put(`/products/${id}`, data);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}
