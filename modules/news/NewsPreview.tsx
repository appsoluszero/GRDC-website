import React from "react";
import ReactMarkdown from "react-markdown";
import { useDeleteNews } from "../../common/hooks/news";
import { News, NewsToUpload } from "../../common/types/news";
import styles from "./NewsPreview.module.scss";

type NewsPreviewProps = {
  news: News | NewsToUpload;
};

export default function NewsPreview(props: NewsPreviewProps) {
  const { title, content } = props.news;
  const id = "id" in props.news ? props.news.id : null;

  const { mutateAsync: deleteNews } = useDeleteNews();

  return (
    <div className={styles.news}>
      <div>
        <h3>{title}</h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div>{id && <button onClick={() => deleteNews(id)}>DELETE</button>}</div>
    </div>
  );
}
