// service/post.ts
import api from "../core/api";

type PostData = {
  title: string;
  slug: string;
  type: "job" | "news";
  content: string;
  summary?: string;
  imageUrl?: string;
  status?: "draft" | "published";
  publishedAt?: string;
  categories: string[];
  jobDetail?: {
    location: string;
    salary: string;
    jobType: string;
    deadline: string;
    qty:number;
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

export async function getAllPosts(query) {
  if(query&& Object.keys(query).length>0){
    query = new URLSearchParams(query).toString()
  }
  try {
    const res = await api.get(`/posts?${query}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}

export async function getPostByID(id) {
  
  try {
    const res = await api.get(`/posts/${id}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}
export async function createPost(data: PostData) {
  try {
    const res = await api.post("/posts", data);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}

export async function updatePost(id: string, data: PostData) {
  try {
    const res = await api.put(`/posts/${id}`, data);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}

export async function deletePost(id: string) {
  try {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
  } catch (e) {
    return handleError(e);
  }
}
