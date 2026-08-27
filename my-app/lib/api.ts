import { Article, ArticlesResponse, Author } from "./type";

const API_BASE_URL = "https://dummyjson.com";

export async function getArticles(
  page: number = 1,
  limit: number = 10
): Promise<ArticlesResponse> {
  const skip = (page - 1) * limit;
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return { posts: [], total: 0, skip: 0, limit };
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { posts: [], total: 0, skip: 0, limit };
  }
}

// Fetch an article by ID
export async function getArticle(id: string | number): Promise<Article | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    return null;
  }
}

export async function searchArticles(
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<ArticlesResponse> {
  const skip = (page - 1) * limit;
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return { posts: [], total: 0, skip: 0, limit };
    }

    return response.json();
  } catch (error) {
    console.error("Error searching articles:", error);
    return { posts: [], total: 0, skip: 0, limit };
  }
}

export async function getTags(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/tag-list`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function getArticlesByTag(
  tag: string,
  page: number = 1,
  limit: number = 10
): Promise<ArticlesResponse> {
  const skip = (page - 1) * limit;
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts/tag/${encodeURIComponent(tag)}?limit=${limit}&skip=${skip}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return { posts: [], total: 0, skip: 0, limit };
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching articles for tag ${tag}:`, error);
    return { posts: [], total: 0, skip: 0, limit };
  }
}

export async function getUser(userId: number | string): Promise<Author | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    return null;
  }
}

export async function getRelatedArticles(
  tag: string,
  currentArticleId: number,
  limit: number = 3
): Promise<Article[]> {
  try {
    const data = await getArticlesByTag(tag, 1, limit + 2);
    return data.posts
      .filter((post) => post.id !== currentArticleId)
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}