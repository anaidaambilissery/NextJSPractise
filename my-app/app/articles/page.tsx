import Pagination from '@/components/Pagination/Pagination';
import { getArticles } from '@/lib/api';
import { ArticlesPageProps } from '@/lib/type';
import React from 'react'

const ArticlesPage = async({searchParams} :ArticlesPageProps) => {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const datas = await getArticles(page, limit);

    const totalPages = Math.ceil(datas.total / limit);
  return (
    <main>
      <h1>Articles</h1>
      <p>Browse our latest technical articles.</p>
      
      <div>
        {datas?.posts?.map((data)=>(
            <article key={data.id}>
                <h2>{data.title}</h2>
                <p>{data.body}</p>
            </article>
        ))}
      </div>
      <Pagination
      currentPage={page}
      totalPages={totalPages}
      limit={limit}/>
    </main>
  )
}

export default ArticlesPage