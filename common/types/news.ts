import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type News = z.infer<typeof newsSchema>;
