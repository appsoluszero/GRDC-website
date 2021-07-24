import React from "react";
import { News as NewsType, newsSchema } from "../common/types/news";
import styles from "../styles/News.module.scss";
import ReactMarkdown from "react-markdown";
import NewsAddForm from "../modules/news/newsAddForm";
import { useNews } from "../common/hooks/news";
import NewsPreview from "../modules/news/NewsPreview";

export default function News() {
  const { news } = useNews();

  return (
    <div>
      {news?.map((news: NewsType, i) => (
        <NewsPreview key={i} news={news} />
      ))}

      <NewsAddForm />
    </div>
  );
}
