import axios from "axios";
import type { LoginFormTypes } from "./Login";
import type { SignupFormTypes } from "./Signup";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/users",
});

// getch access token after login
export const fetchAcessToken = async (formData: LoginFormTypes) => {
  const response = await apiClient.post("/token/", formData);
  return response;
};

// fetch user data on page load using access token
export const fetchUser = async (accessToken: string, refreshToken: string) => {
  try {
    const response = await apiClient.get("/home/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    // fetch user again with refresh token
    try {
      const tokenResponse = await apiClient.post("/token/refresh/", {
        refresh: refreshToken,
      });

      const userResponse = await apiClient.get("/home/", {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access}`,
        },
      });

      return userResponse;
    } catch (error) {
      console.log(error);

      // return {data:}
    }
  }
};

export const editUser = async (accessToken: string) => {
  const response = await apiClient.put("/home/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      form_data: "",
    },
  });
  return response;
};

export const registerUser = async (data: SignupFormTypes) => {
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

  const response = await apiClient.post("/register/", formData);
  return response;
};

export const loginUser = async (data: LoginFormTypes) => {
  const response = await apiClient.post("/login/", data);
  return response;
};

export const logoutUser = async (accessToken: string, refreshToken: string) => {
  const response = await apiClient.post("/logout/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: {
      refresh: refreshToken,
    },
  });
  return response;
};
