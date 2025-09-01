import axios from "axios";
import type { ListingTypes } from "@/App.types";
import { API_URL } from "@/constants";

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
