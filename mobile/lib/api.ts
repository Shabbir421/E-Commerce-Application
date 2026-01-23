// /** @format */

// import { useAuth } from "@clerk/clerk-expo";
// import axios from "axios";
// import { useEffect } from "react";

// // localhost will work in simulator
// // const API_URL = "http://localhost:3000";

// // prod url will work in your physical device
// const API_URL = "https://e-commerce-application-backend-one.vercel.app/api";

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const useApi = () => {
//   const { getToken } = useAuth();

//   useEffect(() => {
//     const interceptor = api.interceptors.request.use(async (config) => {
//       const token = await getToken();

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }

//       return config;
//     });

//     // cleanup: remove interceptor when component unmounts

//     return () => {
//       api.interceptors.request.eject(interceptor);
//     };
//   }, [getToken]);

//   return api;
// };

// // on every single req, we would like have an auth token so that our backend knows that we're authenticated
// // we're including the auth token under the auth headers


/** @format */

import { useAuth } from "@clerk/clerk-expo";
import axios from "axios";
import { useEffect, useRef } from "react";

// Production API URL
const API_URL = "https://e-commerce-application-backend-one.vercel.app/api";

// Create a single axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = () => {
  const { getToken } = useAuth();
  const isInterceptorSet = useRef(false);

  useEffect(() => {
    if (isInterceptorSet.current) return;

    const interceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    isInterceptorSet.current = true;

    // cleanup: remove interceptor when unmount
    return () => {
      api.interceptors.request.eject(interceptor);
      isInterceptorSet.current = false;
    };
  }, [getToken]);

  return api;
};
