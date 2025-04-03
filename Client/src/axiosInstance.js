import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

instance.interceptors.request.use(async (config) => {
  try {
    const accessToken = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  } catch (error) {
    console.log(error);
  }
});

instance.interceptors.response.use(
  (response) => {
    console.log("response data:", response.data);
    return response;
  },
  (error) => {
    console.error("response error;", error);
    if (error.response.status === 401) {
      console.log("Unauthorized access, redirecting to login");
    }
  }
);

export default instance;
