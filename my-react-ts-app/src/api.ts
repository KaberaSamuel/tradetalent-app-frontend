import axios from "axios";
import type { UserTypes, SignupFormTypes, LoginFormTypes } from "./App.types";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const fetchToken = async (formData: LoginFormTypes) => {
  const response = await apiClient.post("/token/", formData);
  return response;
};

export const fetchUsers = async (): Promise<UserTypes[]> => {
  const response = await apiClient.get("/users/");
  return response.data;
};

export const fetchUser = async (token: string): Promise<UserTypes> => {
  const response = await apiClient.get("/home/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const submitUser = async (data: SignupFormTypes) => {
  const { fullname, email, password1: password } = data;

  const names = fullname.split(" ");
  let first_name: string;
  let last_name: string;
  let restNames: string[];

  if (names.length <= 2) {
    [first_name, last_name = ""] = names;
  } else {
    [first_name, ...restNames] = names;
    last_name = restNames.join(" ");
  }

  const formData = {
    first_name,
    last_name,
    email,
    password,
  };

  const response = await apiClient.post("/users/", formData);
  return response;
};

export const loginUser = async (data: LoginFormTypes) => {
  const response = await apiClient.post("/login/", data);
  return response;
};
