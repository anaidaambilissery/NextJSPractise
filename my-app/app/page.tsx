import { getArticles } from '@/lib/api';
import React from 'react'

const Home = async() => {
  const articles = await getArticles();
  return (
      <main>
      <section>
      <h1>Technical Blog</h1>
      <p>Learn about Next.js and modern web development.</p>
      </section>

      <section>
        <h2>Latest Articles</h2>
        <div>
          {articles?.posts?.map((article) => (
            <article key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home