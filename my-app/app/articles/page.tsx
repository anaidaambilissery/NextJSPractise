import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getArticles, getArticlesByTag, getTags, searchArticles } from "@/lib/api";
import { ArticlesPageProps } from "@/lib/type";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/Search/SearchBar";
import TagFilter from "@/components/Filter/TagFilter";
import styles from "./articles.module.css";

export async function generateMetadata({
  searchParams,
}: ArticlesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = params.page ? ` - Page ${params.page}` : "";
  const filter = params.tag ? ` in #${params.tag}` : params.search ? ` matching "${params.search}"` : "";

  return {
    title: `Articles${filter}${page}`,
    description: `Browse technical articles and tutorials on web development${filter}.`,
    alternates: {
      canonical: "/articles",
    },
  };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const searchQuery = params.search?.trim() || "";
  const selectedTag = params.tag?.trim() || "";

  const [tags, articlesData] = await Promise.all([
    getTags(),
    searchQuery
      ? searchArticles(searchQuery, page, limit)
      : selectedTag
      ? getArticlesByTag(selectedTag, page, limit)
      : getArticles(page, limit),
  ]);

  const totalPages = Math.ceil(articlesData.total / limit);

  return (
    <main>
      <header className={styles.header}>
        <h1 className={styles.title}>All Articles</h1>
        <p className={styles.description}>
          Browse our library of technical articles, guides, and engineering tips.
        </p>
      </header>

      {/* Search and Filter Section */}
      <section className={styles.controls} aria-label="Article filters">
        <SearchBar initialSearch={searchQuery} />
        <TagFilter tags={tags} selectedTag={selectedTag} />
      </section>

      <div className={styles.resultsCount}>
        {articlesData.total === 0 ? (
          <p>No articles found.</p>
        ) : (
          <p>
            Showing {articlesData.posts.length} of {articlesData.total} articles
            {searchQuery && ` for "${searchQuery}"`}
            {selectedTag && ` tagged with #${selectedTag}`}
          </p>
        )}
      </div>

      {/* Articles */}
      {articlesData.posts.length > 0 ? (
        <section aria-label="Articles list">
          {articlesData.posts.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            limit={limit}
            tag={selectedTag}
            search={searchQuery}
            baseUrl="/articles"
          />
        </section>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>No Articles Found</h2>
          <p className={styles.emptyStateText}>
            We could not find any articles matching your search criteria.
          </p>
          <Link href="/articles" className="btn">
            Clear Filters & View All
          </Link>
        </div>
      )}
    </main>
  );
}