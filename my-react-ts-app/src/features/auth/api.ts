import axios from "axios";
import type { LoginFormTypes } from "./Login";
import type { SignupFormTypes } from "./Signup";
import type { EditFormTypes } from "../profile/EditProfile";
import type { UserTypes } from "../../App.types";

interface FetchUserResult {
  data: {
    user: UserTypes;
  };
  newAccessToken?: string;
  status: number;
  statusText: string;
  headers: any;
}

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/users",
});

export const fetchUser = async (
  accessToken: string,
  refreshToken: string
): Promise<FetchUserResult> => {
  try {
    const response = await apiClient.get("/home/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      // No newAccessToken since we didn't refresh
    };
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

      return {
        data: userResponse.data,
        status: userResponse.status,
        statusText: userResponse.statusText,
        headers: userResponse.headers,
        newAccessToken: tokenResponse.data.access, // Include the new token
      };
    } catch (error) {
      throw error;
    }
  }
};

export const editUser = async (accessToken: string, data: EditFormTypes) => {
  let form_data = new FormData();

  if (data.uploaded_image) {
    form_data.append("profile_image", data.uploaded_image);
  }

  form_data.append("email", data.email);
  form_data.append("name", data.name);
  form_data.append("location", data.location);
  form_data.append("about", data.about);
  form_data.append("services_offered", data.services_offered);
  form_data.append("services_needed", data.services_needed);

  const response = await apiClient.post("/home/", form_data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const registerUser = async (data: SignupFormTypes) => {
  const response = await apiClient.post("/register/", data);
  return response;
};

export const loginUser = async (data: LoginFormTypes) => {
  const response = await apiClient.post("/login/", data);
  return response;
};

export const logoutUser = async (accessToken: string, refreshToken: string) => {
  const response = await apiClient.post(
    "/logout/",
    { refresh: refreshToken },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};
