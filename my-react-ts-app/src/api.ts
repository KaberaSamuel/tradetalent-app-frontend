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

  const username = fullname.replaceAll(" ", "");
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
    username,
    first_name,
    last_name,
    email,
    password,
  };

  const response = await apiClient.post("/users/", formData);
  return response;
};
