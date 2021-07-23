import React from "react";
import { useForm } from "react-hook-form";
import { addNews, useNews } from "../common/hooks/news";
import NewsType from "../common/types/news";
import styles from "../styles/News.module.scss";

export default function News() {
  const { news } = useNews();
  const { register, handleSubmit, reset } = useForm();

  return (
    <div>
      {news?.map((news) => (
        <div className={styles.news}>
          <h3>{news.title}</h3>
          <p>{news.content}</p>
        </div>
      ))}

      <form
        className={styles.news_form}
        onSubmit={handleSubmit((news: NewsType) => {
          addNews(news);
          reset();
        })}
      >
        <label>Title</label>
        <input type="text" {...register("title")} />
        <label>Content</label>
        <textarea {...register("content")} />
        <input type="submit" />
      </form>
    </div>
  );
}
