// Types for Article data
export type ArticleReactions = {
  likes: number;
  dislikes: number;
};

export type Article = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  views: number;
  userId: number;
  reactions?: ArticleReactions;
};

export type ArticlesResponse = {
  posts: Article[];
  total: number;
  skip: number;
  limit: number;
};

export type Author = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  company?: {
    name: string;
    title: string;
  };
};

export type ArticlesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    tag?: string;
  }>;
};

// Props type for Tag page URL parameters
export type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

// Props type for Single Article page
export type ArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};
