import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import news from "../../../server/news";
import jwt from "next-auth/jwt";
import { getSession } from "next-auth/client";

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient;
}
export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

// main router
const appRouter = createRouter()
  .merge("news.", news)
  .query("test", {
    async resolve({ ctx }) {
      // Returning jwt to client is a very very BAD idea of security
      // Do remove this api route if it somehow slip to production
      return {
        session: await getSession({ req: ctx.req }),
        jwt: await jwt.getToken({ req: ctx.req, secret: process.env.SECRET }),
      };
    },
  });

// trpc setup
function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  return {
    prisma,
    req,
  };
}

type Context = inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  // teardown: () => prisma.$disconnect(),
});
