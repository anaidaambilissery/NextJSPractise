import { ArticlesResponse } from "./type";

export const getArticles = async (page:number=1,limit:number=10): Promise<ArticlesResponse> => {
    const skip = (page - 1) * limit;
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
};
