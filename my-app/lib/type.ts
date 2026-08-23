export type Article ={
    id: number;
    title:string;
    body:string;
    tags:string[];
    views:number;
    userId:number;
}

export type ArticlesResponse = {
    posts:Article[];
    total:number;
    skip:number;
    limit:number;
}

export type ArticlesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};
