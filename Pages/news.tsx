import React from "react";
import { News as NewsType } from "../common/types/news";
import NewsAddForm from "../modules/news/NewsAddForm";
import { useNews } from "../common/hooks/news";
import NewsPreview from "../modules/news/NewsPreview";

export default function News() {
  const { data: news } = useNews();
  return (
    <div>
      {news?.map((news: NewsType, i) => (
        <NewsPreview key={i} news={news} />
      ))}

      <NewsAddForm />
    </div>
  );
}
