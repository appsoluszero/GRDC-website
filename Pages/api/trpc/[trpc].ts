import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import news from "../../../server/news";

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient;
}
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

// main router
const appRouter = createRouter().merge("news.", news);

// trpc setup
function createContext() {
  return {
    prisma,
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
