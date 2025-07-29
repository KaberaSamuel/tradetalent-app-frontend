import axios from "axios";
import type { User, SignupFormTypes } from "./App.types";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const submitUser = async (data: SignupFormTypes) => {
  const { fullname, email, password1: password } = data;
  const formData = { fullname, email, password };
  const response = await apiClient.post("/users/", formData);
  return response;
};
