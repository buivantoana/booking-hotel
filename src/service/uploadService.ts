import api from "../core/api";

// Upload image lên Cloudinary thông qua backend
export async function uploadImage(formData: any): Promise<string | undefined> {
  try {
    const response = await api.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return undefined;
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
}
