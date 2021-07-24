import React from "react";
import ReactMarkdown from "react-markdown";
import { News } from "../../common/types/news";
import styles from "./NewsPreview.module.scss";

export default function NewsPreview(props: { news: News }) {
  const { title, content } = props.news;

  return (
    <div className={styles.news}>
      <h3>{title}</h3>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
