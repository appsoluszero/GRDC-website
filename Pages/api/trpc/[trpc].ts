import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import superjson from "superjson";
import * as trpc from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import news from "../../../server/news";
import test from "../../../server/test";
import user from "../../../server/user";

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient;
}
export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

// main router
export const appRouter = createRouter()
  .transformer(superjson)
  .merge("news.", news)
  .merge("user.", user)
  .merge("test.", test);

// trpc setup
async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  return {
    prisma,
    token: await getToken({ req, secret: process.env.SECRET }),
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
