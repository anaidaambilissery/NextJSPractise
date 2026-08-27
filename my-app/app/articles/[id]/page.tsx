import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle } from "@/lib/api";
import styles from "./page.module.css"

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

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

  return {
    title: article.title,
    description: article.body.slice(0, 160),

    keywords: article.tags,

    authors: [
      {
        name: `User ${article.userId}`,
      },
    ],

    openGraph: {
      title: article.title,
      description: article.body.slice(0, 160),
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.body.slice(0, 160),
    },
  };
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { id } = await params;

  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

 return (
  <main className={styles.container}>
    <article className={styles.article}>
      <h1 className={styles.title}>{article.title}</h1>

      <p className={styles.body}>{article.body}</p>

      <section className={styles.tagsSection}>
        <h2 className={styles.tagsTitle}>Tags</h2>

        <div className={styles.tags}>
          {article.tags?.map((tag: string) => (
            <span className={styles.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Views : </span>
          <span className={styles.statValue}>{article.views}</span>
        </div>

        <div className={styles.stat}>
          <span className={styles.statLabel}>Likes : </span>
          <span className={styles.statValue}>
            {article.reactions?.likes}
          </span>
        </div>

        <div className={styles.stat}>
          <span className={styles.statLabel}>Dislikes :</span>
          <span className={styles.statValue}>
            {article.reactions?.dislikes}
          </span>
        </div>
      </div>
    </article>
  </main>
);
};

export default ArticlePage;