import api from "../core/api";

export async function createBooking(body: any) {
    try {
      let token = localStorage.getItem("access_token");
      const response = await api.post(`/booking/create`, body,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        return error.response.data;
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  }
  
  export async function reviewBooking(id,body: any) {
    try {
      let token = localStorage.getItem("access_token");
      const response = await api.post(`/booking/${id}/review`, body,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        return error.response.data;
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  }
  