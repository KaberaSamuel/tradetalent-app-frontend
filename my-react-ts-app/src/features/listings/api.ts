import axios from "axios";
import type { ListingTypes } from "../../App.types";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/listings",
});

export const postListing = async (accessToken: string, data: ListingTypes) => {
  const response = await apiClient.post("/", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
