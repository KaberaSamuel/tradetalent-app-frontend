import axios from "axios";
import type { User } from "./App.types";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const submitUser = async () => {
  const response = await apiClient.post("/users");
  return response.data;
};
