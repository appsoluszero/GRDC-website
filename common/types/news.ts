import type { News as DatabaseNews } from "@prisma/client";
import { z } from "zod";
import { assert, IsExact } from "conditional-type-checks";

export const newsSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  content: z.string().min(1),
});
export const newsToUploadSchema = newsSchema.omit({ id: true });

/// News with id, representing one fetched from database
export type News = DatabaseNews;
/// News without id, representing one that doesn't get upload to database yet (eg. from user submitting form)
export type NewsToUpload = Omit<News, "id">;

// Type level checking
// Check that schema structure match the type defination
assert<IsExact<z.infer<typeof newsSchema>, News>>(true);
assert<IsExact<z.infer<typeof newsToUploadSchema>, NewsToUpload>>(true);
