import React from "react";
import NewsAddForm from "../modules/news/NewsAddForm";
import NewsPreview from "../modules/news/NewsPreview";
import { trpc } from "../common/hooks/trpc";
import { useState } from "react";

function News() {
  const { data: news } = trpc.useQuery(["news.all"], { ssr: true });
  const [compact, setCompact] = useState(false);

  return (
    <div>
      <label>Compact</label>
      <input
        checked={compact}
        onChange={() => setCompact((x) => !x)}
        type="checkbox"
      />

      {news?.map((news) => (
        <NewsPreview news={news} compact={compact} key={news.id} />
      ))}
      <NewsAddForm />
    </div>
  );
}

export default News;
