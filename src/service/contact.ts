import api from "../core/api";


export const submitJobApplication = async (formData:any) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("dob", formData.dob);
  data.append("email", formData.email);
  data.append("phone", formData.phone);
  data.append("position", formData.position);
  data.append("profileLink", formData.profileLink);
  data.append("intro", formData.intro);
  data.append("file", formData.file);

  const response = await api.post("/apply", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};