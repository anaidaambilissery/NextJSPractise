import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getArticles, getTags } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore the latest articles on web development, Next.js App Router, TypeScript, and software engineering practices.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const [articlesData, tags] = await Promise.all([
    getArticles(1, 6),
    getTags(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to Technical Blog</h1>
        <p className={styles.heroSubtitle}>
          Discover deep dives, tutorials, and best practices in modern web
          development and Next.js.
        </p>
        <div className={styles.heroActions}>
          <Link href="/articles" className="btn">
            Browse All Articles
          </Link>
          <Link href="/tags" className="btn btn-secondary">
            Explore Tags
          </Link>
        </div>
      </section>


      {/* Latest Articles Section */}
      <section aria-labelledby="latest-articles-title">
        <div className={styles.sectionHeader}>
          <h2 id="latest-articles-title" className={styles.sectionTitle}>
            Latest Articles
          </h2>
          <Link href="/articles" className={styles.viewAllLink}>
            View all articles ({articlesData.total}) &rarr;
          </Link>
        </div>

        <div className="articles-list">
          {articlesData.posts.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}