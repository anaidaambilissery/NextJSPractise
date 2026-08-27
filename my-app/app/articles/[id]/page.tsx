import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getUser, getRelatedArticles } from "@/lib/api";
import { ArticlePageProps } from "@/lib/type";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  const author = await getUser(article.userId);
  const authorName = author ? `${author.firstName} ${author.lastName}` : `Author ${article.userId}`;
  const excerpt = article.body.length > 155 ? `${article.body.slice(0, 155)}...` : article.body;

  return {
    title: article.title,
    description: excerpt,
    keywords: article.tags,
    authors: [{ name: authorName }],
    alternates: {
      canonical: `/articles/${id}`,
    },
    openGraph: {
      title: article.title,
      description: excerpt,
      url: `/articles/${id}`,
      type: "article",
      publishedTime: new Date().toISOString(),
      authors: [authorName],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: excerpt,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const primaryTag = article.tags && article.tags.length > 0 ? article.tags[0] : "general";
  const [author, relatedArticles] = await Promise.all([
    getUser(article.userId),
    getRelatedArticles(primaryTag, article.id, 3),
  ]);

  const authorName = author
    ? `${author.firstName} ${author.lastName}`
    : `Author #${article.userId}`;

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.body.slice(0, 160),
    articleBody: article.body,
    keywords: article.tags.join(", "),
    author: {
      "@type": "Person",
      name: authorName,
      email: author?.email,
    },
  };

  return (
    <main className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/articles" className={styles.backLink}>
        &larr; Back to all articles
      </Link>

      <article>
        <header className={styles.articleHeader}>
          <h1 className={styles.title}>{article.title}</h1>

          {/* Tags */}
          <div className={styles.tags} aria-label="Article tags">
            {article.tags?.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`} className={styles.tag}>
                #{tag}
              </Link>
            ))}
          </div>

          {/* Stats Bar */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span>Views:</span>
              <span className={styles.statValue}>{article.views}</span>
            </div>
            <div className={styles.statItem}>
              <span>Likes:</span>
              <span className={styles.statValue}>
                {article.reactions?.likes ?? 0}
              </span>
            </div>
            <div className={styles.statItem}>
              <span>Dislikes:</span>
              <span className={styles.statValue}>
                {article.reactions?.dislikes ?? 0}
              </span>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <p>{article.body}</p>
        </div>

        {/* Author Information */}
        <section className={styles.authorCard} aria-labelledby="author-heading">
          <h2 id="author-heading" className={styles.authorCardTitle}>
            About the Author
          </h2>
          <div className={styles.authorDetails}>
            {author?.image ? (
              <Image
                src={author.image}
                alt={`${authorName}'s profile`}
                width={56}
                height={56}
                className={styles.authorAvatar}
              />
            ) : (
              <div className={styles.authorAvatar} />
            )}
            <div className={styles.authorInfo}>
              <h3 className={styles.authorName}>{authorName}</h3>
              {author?.company && (
                <p className={styles.authorCompany}>
                  {author.company.title} at {author.company.name}
                </p>
              )}
              {author?.email && (
                <p className={styles.authorEmail}>
                  {author.email}
                </p>
              )}
            </div>
          </div>
        </section>
      </article>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className={styles.relatedSection} aria-labelledby="related-heading">
          <h2 id="related-heading" className={styles.relatedTitle}>
            Related Articles (#{primaryTag})
          </h2>
          <div className={styles.relatedList}>
            {relatedArticles.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}