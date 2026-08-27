import React from "react";
import Link from "next/link";
import { Article } from "@/lib/type";
import "./ArticleCard.css";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="article-card">
      <h2 className="article-card-title">
        <Link href={`/articles/${article.id}`}>{article.title}</Link>
      </h2>

      <p className="article-card-body">{article.body}</p>

      <div className="article-card-footer">
        <div className="article-card-tags">
          {article.tags?.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="tag-badge">
              #{tag}
            </Link>
          ))}
        </div>

        <div className="article-card-stats">
          <span>👁️ {article.views} views</span>
          {article.reactions && (
            <span>👍 {article.reactions.likes}</span>
          )}
        </div>
      </div>
    </article>
  );
}
