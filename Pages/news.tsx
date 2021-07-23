import React from "react";
import { useForm } from "react-hook-form";
import { addNews, useNews } from "../common/hooks/news";
import { News as NewsType, newsSchema } from "../common/types/news";
import styles from "../styles/News.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";

export default function News() {
  const { news } = useNews();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsSchema),
  });

  return (
    <div>
      {news?.map((news: NewsType, i) => (
        <div key={i} className={styles.news}>
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
        <input
          type="text"
          {...register("title", {
            required: true,
          })}
        />
        <span>{errors.title?.message}</span>
        <label>Content</label>
        <textarea {...register("content")} />
        <span>{errors.content?.message}</span>
        <input type="submit" />
      </form>
    </div>
  );
}
