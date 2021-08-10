import React from "react";
import NewsAddForm from "../modules/news/NewsAddForm";
import NewsPreview from "../modules/news/NewsPreview";
import { trpc } from "../common/hooks/trpc";

function News() {
  const { data: news } = trpc.useQuery(["news.all"], { ssr: true });

  return (
    <div>
      {news?.map((news) => (
        <NewsPreview news={news} key={news.id} />
      ))}

      <NewsAddForm />
    </div>
  );
}

export default News;
