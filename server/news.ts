import { z } from "zod";
import { newsToUploadSchema, newsSchema } from "../common/types/news";
import { createRouter } from "../pages/api/trpc/[trpc]";

export default createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.news.findMany();
    },
  })
  .mutation("post", {
    input: newsToUploadSchema,
    async resolve({ ctx, input: news }) {
      await ctx.prisma.news.create({
        data: news,
      });
    },
  })
  .mutation("delete", {
    input: newsSchema.shape.id,
    async resolve({ ctx, input: id }) {
      await ctx.prisma.news.delete({
        where: {
          id,
        },
      });
    },
  });
