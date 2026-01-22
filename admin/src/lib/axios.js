/** @format */
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://e-commerce-application-backend-one.vercel.app/api",
});

// Attach Clerk token to every request
export const attachClerkToken = (getToken) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export default axiosInstance;
