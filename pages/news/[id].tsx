import { useRouter } from "next/dist/client/router";
import React from "react";
import { newsSchema } from "../../common/types/news";
import { trpc } from "../../common/hooks/trpc";
import Link from "next/link";

function _News(props: { id: number }) {
  const { data: news, error } = trpc.useQuery(["news.content", props.id], {
    ssr: false,
  });

  if (news === undefined) {
    return <span>Loading...</span>;
  }
  if (news === null) {
    return <span>404 Not Found</span>;
  }

  return (
    <div>
      <Link href="/news">
        <a>Back</a>
      </Link>

      <h1>{news.title}</h1>
      <p>{news.content}</p>
    </div>
  );
}

export default function NewsContent() {
  const router = useRouter();
  const idStr = router.query.id;

  if (typeof idStr !== "string") {
    return null;
  }
  const id = +idStr;
  if (isNaN(id)) {
    return (
      <span>
        id <u>{idStr}</u> cannot be parsed into integer
      </span>
    );
  }
  const result = newsSchema.shape.id.safeParse(id);
  if (!result.success) {
    return <span>Invalid id: {result.error.format()._errors}</span>;
  }

  return <_News id={id} />;
}
