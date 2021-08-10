import { useSession } from "next-auth/client";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import TimeCounter from "../../common/components/time_counter";
import { useDeleteNews } from "../../common/hooks/news";
import { News, NewsToUpload } from "../../common/types/news";
import styles from "./NewsPreview.module.scss";

type NewsPreviewProps = {
  news: News | NewsToUpload;
};

export default function NewsPreview(props: NewsPreviewProps) {
  const { title, content } = props.news;
  const createTime = "createTime" in props.news ? props.news.createTime : null;
  const id = "id" in props.news ? props.news.id : null;

  const { mutateAsync: deleteNews } = useDeleteNews();
  const [session, loading] = useSession();

  const titleElem = (
    <b>
      <ReactMarkdown>{title}</ReactMarkdown>
    </b>
  );

  return (
    <div className={styles.news}>
      <div>
        {id ? (
          <Link href={{ pathname: "/news/[id]", query: { id: id } }}>
            <a>{titleElem}</a>
          </Link>
        ) : (
          titleElem
        )}

        {content && (
          <ReactMarkdown className={styles.content}>{content}</ReactMarkdown>
        )}
      </div>

      <div>
        {createTime && (
          <div>
            <i>{createTime.toISOString()}</i>
            <br />
            <TimeCounter from={createTime} />
          </div>
        )}
        {id && session?.isAdmin && (
          <button
            onClick={() =>
              confirm(`Confirm Deleting News: \`${title}\``) && deleteNews(id)
            }
          >
            DELETE
          </button>
        )}
      </div>
    </div>
  );
}
