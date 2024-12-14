import axiosInstance from "../axiosIntance";
export const postData = async (data) => {
  try {
    const response = await axiosInstance.post(`/posts`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

export const getData = async (data) => {
  try {
    const response = await axiosInstance.get(`/posts`, {
      params: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

export const getDetailData = async (id) => {
  try {
    const response = await axiosInstance.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
  }
};
