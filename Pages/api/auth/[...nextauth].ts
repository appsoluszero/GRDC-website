import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { prisma } from "../trpc/[trpc]";
import { Chance } from "chance";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn(user, account, profile) {
      const id = account.id;

      try {
        // Create user if not exist
        await prisma.userInfo.upsert({
          where: {
            userId: id,
          },
          create: {
            // Here is where we initalize user info for new user
            userId: id,
            username: user.name ?? profile.name ?? Chance().name(),
            email: user.email,
            role: 0,
          },
          update: {},
        });
      } catch (error) {
        console.error(error);
        return false;
      }

      return true;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user && account) {
        console.log("Database fetch");
        const info = await prisma.userInfo.findUnique({
          where: {
            userId: account.id,
          },
        });

        token.role = info?.role ?? 0;
      }
      if (account?.accessToken) {
        token.userId = account.id;
      }
      return token;
    },
    async session(session, token) {
      if (typeof token.role == "number") {
        session.role = token.role;
      }
      return session;
    },
  },

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
});
