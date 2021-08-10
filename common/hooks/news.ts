import { News } from "../types/news";
import { trpc } from "./trpc";

export function useAddNews() {
  /*
  mutate("/news", (x: News[]) => [...x, news], false);

  fetch("/api/news.ts", {
    method: "POST",
    body: JSON.stringify(news),
  });
  mutate("/news");*/
  const client = trpc.useContext();

  return trpc.useMutation("news.post", {
    onSuccess: () => {
      client.invalidateQuery(["news.all"]);
    },
  });
}

export function useDeleteNews() {
  const client = trpc.useContext();

  return trpc.useMutation("news.delete", {
    onMutate: async (id) => {
      await client.cancelQuery(["news.all"]);

      const newsList = client.getQueryData(["news.all"]) ?? [];
      client.setQueryData(
        ["news.all"],
        newsList.filter((news) => news.id != id)
      );

      return { newsList };
    },
    onError: (err, id, ctx) => {
      const oldNewsList = (ctx as { newsList: News[] }).newsList;
      client.setQueryData(["news.all"], oldNewsList);
    },
    onSuccess: () => {
      client.invalidateQuery(["news.all"]);
    },
  });
}
