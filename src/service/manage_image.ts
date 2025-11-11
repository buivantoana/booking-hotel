// service/post.ts
import api from "../core/api";

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

export async function getImageByName(id: any) {
  try {
    const res = await api.get(`/image/${id}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}
export async function createImage(data: any) {
  try {
    const res = await api.post("/image", data);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}

export async function updateImage(id: string, data: any) {
  try {
    const res = await api.put(`/image/${id}`, data);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}
