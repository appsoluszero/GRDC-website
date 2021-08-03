import React from "react";
import ReactMarkdown from "react-markdown";
import { useDeleteNews } from "../../common/hooks/news";
import { NewsUpload } from "../../common/types/news";
import styles from "./NewsPreview.module.scss";

type NewsPreviewProps = {
  news: NewsUpload & { id?: string };
};

export default function NewsPreview(props: NewsPreviewProps) {
  const { id, title, content } = props.news;

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
