import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTopAnime = async () => {
  const response = await apiClient.get("/top/anime");
  return response.data.data;
};

export const getAnimeDetails = async (id: string) => {
  const response = await apiClient.get(`/anime/${id}`);
  return response.data.data;
};

export const searchAnime = async (query: string) => {
  if (!query || query.trim().length < 3) return [];

  const response = await apiClient.get(`/anime?q=${query.trim()}`);
  return response.data.data;
};
