import type { ListingTypes } from "@/App.types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: `${API_URL}/listings`,
});

export const fetchListings = async (
  accessToken: string,
  query?: string
): Promise<ListingTypes[]> => {
  const urlQuery = query ? `/?search=${query}` : "/";
  const response = await apiClient.get(urlQuery, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const fetchListingDetail = async (
  accessToken: string,
  slug: string
): Promise<ListingTypes> => {
  const response = await apiClient.get(`/${slug}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

// fetch active listings posted by the user
export const fetchActiveListings = async (
  accessToken: string
): Promise<ListingTypes[]> => {
  const response = await apiClient.get("/user/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const postListing = async (accessToken: string, data: ListingTypes) => {
  const response = await apiClient.post("/", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const updateListing = async (
  slug: string,
  accessToken: string,
  data: ListingTypes
) => {
  const response = await apiClient.put(`/${slug}/`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const deleteListing = async (slug: string, accessToken: string) => {
  const response = await apiClient.delete(`/${slug}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const searchListing = async (
  query: string
): Promise<ListingTypes[] | void> => {
  try {
    const response = await apiClient.get(`/?search=${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
