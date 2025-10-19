import type { ConversationTypes } from "@/App.types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: `${API_URL}/chats`,
});

export const fetchConversations = async (
  accessToken: string
): Promise<ConversationTypes[]> => {
  const response = await apiClient.get("/conversations/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
