import { z } from "zod";
import { newsUploadSchema } from "../common/types/news";
import { createRouter } from "../pages/api/trpc/[trpc]";

export default createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.news.findMany();
    },
  })
  .mutation("post", {
    input: newsUploadSchema,
    async resolve({ ctx, input: news }) {
      await ctx.prisma.news.create({
        data: news,
      });
    },
  })
  .mutation("delete", {
    input: z.string(),
    async resolve({ ctx, input: id }) {
      await ctx.prisma.news.delete({
        where: {
          id,
        },
      });
    },
  });
