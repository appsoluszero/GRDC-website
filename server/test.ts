import { createRouter } from "../pages/api/trpc/[trpc]";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { signInGuard } from "../common/utils/api_guard";

export default createRouter()
  .middleware(({ next }) => {
    if (process.env.NODE_ENV === "production") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "This is testing route, remove this route before production",
      });
    } else {
      return next();
    }
  })
  .mutation("set_admin", {
    input: z.boolean(),
    async resolve({ input, ctx }) {
      const token = signInGuard(ctx.token);

      await ctx.prisma.user.update({
        where: {
          userId: token.userId,
        },
        data: {
          isAdmin: input,
        },
      });
    },
  });
