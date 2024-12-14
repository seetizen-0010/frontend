import axiosInstance from "../axiosIntance";
export const postData = async (data) => {
  try {
    const response = await axiosInstance.post(`/posts`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error sending data:", error);
  }
};
