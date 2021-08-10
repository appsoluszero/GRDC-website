import { z } from "zod";
import { adminGuard } from "../common/utils/api_guard";
import { createRouter } from "../pages/api/trpc/[trpc]";

export default createRouter()
  .middleware(({ ctx, next }) => {
    adminGuard(ctx.token);
    return next();
  })
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  })
  .mutation("set_admin", {
    input: z.object({ userId: z.string(), to: z.boolean() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.user.update({
        where: { userId: input.userId },
        data: {
          isAdmin: input.to,
        },
      });
    },
  });
