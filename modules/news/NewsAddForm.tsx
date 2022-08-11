import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddNews } from "../../common/hooks/news";
import { News as NewsType, newsToUploadSchema } from "../../common/types/news";
import ReactMarkdown from "react-markdown";
import styles from "./NewsAddForm.module.scss";
import NewsPreview from "./NewsPreview";
import { signIn, useSession } from "next-auth/react";

export default function NewsAddForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsToUploadSchema),
  });

  const { mutateAsync: addNews, isLoading } = useAddNews();
  const [session] = useSession();

  if (!session) {
    return (
      <h1>
        <button onClick={() => signIn()}>Signin</button> to add more news
      </h1>
    );
  }

  if (!session.isAdmin) {
    return <h1>Unauthorized</h1>;
  }

  return (
    <form
      className={styles.news_form}
      onSubmit={handleSubmit(async (news: NewsType) => {
        await addNews(news);
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
      <input type="submit" disabled={isLoading} />
    </form>
  );
}
