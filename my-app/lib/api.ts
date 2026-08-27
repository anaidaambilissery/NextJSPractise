import { ArticlesResponse } from "./type";

const API_URL = "https://dummyjson.com";

export const getArticles = async (page:number=1,limit:number=10): Promise<ArticlesResponse> => {
    const skip = (page - 1) * limit;
  const response = await fetch(`${API_URL}/posts?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
};

export async function getArticle(id: string) {
  const response = await fetch(`${API_URL}/posts/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
}