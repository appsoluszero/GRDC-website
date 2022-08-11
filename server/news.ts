import { newsToUploadSchema, newsSchema } from "../common/types/news";
import { adminGuard } from "../common/utils/api_guard";
import { createRouter } from "../Pages/api/trpc/[trpc]";

export default createRouter()
  .query("content", {
    input: newsSchema.shape.id,
    async resolve({ input, ctx }) {
      return await ctx.prisma.news.findUnique({
        where: {
          id: input,
        },
      });
    },
  })
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.news
        .findMany()
        .catch((err) => console.error(err));
    },
  })
  .mutation("post", {
    input: newsToUploadSchema,
    async resolve({ input: news, ctx }) {
      const token = adminGuard(ctx.token);

      await ctx.prisma.news
        .create({
          data: {
            authorId: token.userId,
            ...news,
          },
        })
        .catch((err) => console.error(err));
    },
  })
  .mutation("delete", {
    input: newsSchema.shape.id,
    async resolve({ ctx, input: id }) {
      const token = adminGuard(ctx.token);

      await ctx.prisma.news
        .delete({
          where: {
            id,
          },
        })
        .catch((err) => console.error(err));
    },
  });
