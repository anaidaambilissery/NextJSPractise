import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticlesByTag } from "@/lib/api";
import { TagPageProps } from "@/lib/type";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Pagination from "@/components/Pagination/Pagination";

export async function generateMetadata({
  params,
  searchParams,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const sParams = await searchParams;
  const page = sParams.page ? ` - Page ${sParams.page}` : "";

  return {
    title: `Articles tagged #${decodedTag}${page}`,
    description: `Browse all technical articles and tutorials under the #${decodedTag} topic.`,
    alternates: {
      canonical: `/tags/${encodeURIComponent(tag)}`,
    },
    openGraph: {
      title: `Articles tagged #${decodedTag}`,
      description: `Browse all technical articles and tutorials under the #${decodedTag} topic.`,
      url: `/tags/${encodeURIComponent(tag)}`,
    },
  };
}

export default async function TagArticlesPage({
  params,
  searchParams,
}: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const sParams = await searchParams;
  const page = Number(sParams.page) || 1;
  const limit = Number(sParams.limit) || 10;

  try {
    const articlesData = await getArticlesByTag(decodedTag, page, limit);

    if (!articlesData || articlesData.posts.length === 0) {
      notFound();
    }

    const totalPages = Math.ceil(articlesData.total / limit);

    return (
      <main>
        <Link href="/tags" className="btn btn-secondary" style={{ marginBottom: "20px" }}>
          &larr; All Topics
        </Link>

        <header style={{ marginBottom: "24px" }}>
          <h1>#{decodedTag}</h1>
          <p>
            Showing {articlesData.posts.length} of {articlesData.total} articles
            in this topic.
          </p>
        </header>

        <section aria-label={`Articles tagged with ${decodedTag}`}>
          {articlesData.posts.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            limit={limit}
            baseUrl={`/tags/${encodeURIComponent(tag)}`}
          />
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
