import type { UserTypes } from "@/App.types";
import type { LoginFormTypes } from "@/features/auth/Login";
import type { SignupFormTypes } from "@/features/auth/Signup";
import type { EditFormTypes } from "@/features/profile/EditProfile";
import axios from "axios";

interface FetchUserTypes {
  data: {
    user: UserTypes;
  };
  newAccessToken?: string;
  status: number;
  statusText: string;
  headers: unknown;
}

const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: `${API_URL}/users`,
});

export const fetchUser = async (
  accessToken: string,
  refreshToken: string
): Promise<FetchUserTypes> => {
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
    };
  } catch (error: unknown) {
    console.log(error);

    // fetch user again with refresh token
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
      newAccessToken: tokenResponse.data.access,
    };
  }
};

export const fetchUserBySlug = async (
  accessToken: string,
  slug: string
): Promise<UserTypes> => {
  const response = await apiClient.get(`/${slug}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const editUser = async (accessToken: string, data: EditFormTypes) => {
  const form_data = new FormData();

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

export const loginByGoogle = async (token: string) => {
  const response = await apiClient.post("/google/login/", { token });
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

export const deleteUser = async (slug: string, accessToken: string) => {
  const response = await apiClient.delete(`/${slug}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
