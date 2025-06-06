import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

const axiosService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60000,
});

// Request interceptors
axiosService.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptors
axiosService.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response.data;
  },
  async (error: any) => {
    if (error?.response?.status >= 500) {
      // Internal server error contact support
      return Promise.reject({ message: 'Internal server error. Please contact support' });
    }

    if (error?.response?.status === 400) {
      // Bad request
      return Promise.reject({ message: 'Bad request. Check game parameters' });
    }

    throw error; // forward other client errors
  }
);

export const getData = async (url: string, params = {}) => {
  return await axiosService.get(url, { params: params });
};

export const postData = async (url: string, params = {}) => {
  return await axiosService.post(url, { ...params });
};

export const putData = async (url: string, params = {}) => {
  return await axiosService.put(url, { ...params });
};

export const deleteData = async (url: string, config = {}) => {
  return await axiosService.delete(url, config);
};
