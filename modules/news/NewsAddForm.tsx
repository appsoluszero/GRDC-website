import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addNews } from "../../common/hooks/news";
import { News as NewsType, newsSchema } from "../../common/types/news";
import ReactMarkdown from "react-markdown";
import styles from "./NewsAddForm.module.scss";
import NewsPreview from "./NewsPreview";

export default function NewsAddForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsSchema),
  });

  return (
    <form
      className={styles.news_form}
      onSubmit={handleSubmit((news: NewsType) => {
        addNews(news);
        reset();
      })}
    >
      <label>Title</label>
      <input type="text" {...register("title")} />
      <span>{errors.title?.message}</span>

      <label>Content</label>
      <textarea {...register("content")} />
      <span>{errors.content?.message}</span>

      <label>Preview</label>
      <NewsPreview
        news={{
          title: watch("title"),
          content: watch("content"),
        }}
      />
      <input type="submit" />
    </form>
  );
}
