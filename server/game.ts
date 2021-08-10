import { adminGuard } from "../common/utils/api_guard";
import { createRouter } from "../pages/api/trpc/[trpc]";

export default createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.game.findMany({
        include: {
          tags: true,
        },
      });
    },
  })
  .middleware(({ ctx, next }) => {
    adminGuard(ctx.token);
    return next();
  });
