import useSWR, { mutate } from "swr";
import { testDatabase } from "../constants/testDatabase";
import type News from "../types/news";

export function useNews() {
  const { data, error, isValidating } = useSWR<News[]>("/news");

  return {
    news: data,
    error: error,
    isLoading: isValidating,
  };
}

export async function addNews(news: News) {
  mutate("/news", (x: News[]) => [...x, news], false);
  
  // delay 1000 ms to simulate server delay
  // user shouldn't feel the delay because of optimistic updating
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
  
  testDatabase["/news"].push(news);
  mutate("/news");
}
