import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getTags } from "@/lib/api";
import styles from "./tags.module.css";

export const metadata: Metadata = {
  title: "Explore Tags",
  description: "Browse all topics and tags on the Technical Blog.",
  alternates: {
    canonical: "/tags",
  },
};

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <main>
      <header className={styles.header}>
        <h1 className={styles.title}>Explore Topics & Tags</h1>
        <p className={styles.description}>
          Browse all categories and discover articles related to your favorite
          topics.
        </p>
      </header>

      <div className={styles.tagsGrid}>
        {tags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`} className={styles.tagCard}>
            <span className={styles.tagName}>#{tag}</span>
            <span className={styles.tagArrow}>&rarr;</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
