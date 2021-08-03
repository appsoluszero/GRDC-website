import { z } from "zod";

export const newsSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
});

export const newsUploadSchema = newsSchema.omit({ id: true });

/// News with id, representing one fetched from database
export type News = z.infer<typeof newsSchema>;
/// News without id, representing one that doesn't get upload to database yet (eg. from user submitting form)
export type NewsUpload = z.infer<typeof newsUploadSchema>;
