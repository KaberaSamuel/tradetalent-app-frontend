import axios from "axios";
import type { ListingTypes } from "@/App.types";

const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: `${API_URL}/listings`,
});

export const postListing = async (accessToken: string, data: ListingTypes) => {
  const response = await apiClient.post("/", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};

export const fetchListings = async (
  accessToken: string
): Promise<ListingTypes[]> => {
  const response = await apiClient.get("/", {
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
