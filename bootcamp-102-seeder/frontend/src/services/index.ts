import {
  CashKick,
  Payment,
  SelectedContracts,
  UserDetails,
} from "../../utils/constants";
import API from "./API";

export const getCashKicks = async (userId: number) => {
  const response = await API.get(`/cashKicks?userId=${userId}`);
  return response.data;
};

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getContracts = async (userId: number) => {
  const response = await API.get(
    `/contracts/selected-contracts/user/${userId}`
  );
  return response.data;
};

export const postCashKick = async (data: CashKick) => {
  const response = await API.post("/cashKicks", data);
  return response.data;
};

export const postContracts = async (data: SelectedContracts) => {
  const response = await API.post("/contracts/selected-contracts", data);
  return response.data;
};

export const postUser = async (user: UserDetails) => {
  const response = await API.post("/users/save", user);
  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await API.get(`/users/?email=${email}`);
  return response.data;
};
export const getUserById = async (id: number) => {
  const response = await API.get(`/users/${id}`);
  return response.data;
};
export const updateUserPassword = async (data: UserDetails) => {
  const response = await API.put("/users/", data);
  return response.data;
};
export const postPayment = async (data: Payment) => {
  const response = await API.post("/payments", data);
  return response.data;
};
export const getPayments = async (id: number) => {
  const response = await API.get(`/payments?userId=${id}`);
  return response.data;
};
export const getToken = async (data: UserDetails) => {
  const response = await API.post("/users/login", data);
  return response.data;
};
