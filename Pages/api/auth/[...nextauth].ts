import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { prisma } from "../trpc/[trpc]";
import { Chance } from "chance";
import { sessionSetting } from "../../../common/constants/session_setting";

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
  session: {
    maxAge: sessionSetting.maxAge,
  },
  callbacks: {
    async signIn(user, account, profile) {
      const id = account.id;

      try {
        // Create user if not exist
        await prisma.user.upsert({
          where: {
            userId: id,
          },
          create: {
            // Here is where we initalize user info for new user
            userId: id,
            username: user.name ?? profile.name ?? Chance().name(),
            email: user.email,
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
      // Data Syncing (after login stage)
      if (token.userId) {
        console.log("Database fetch");
        const info = await prisma.user.findUnique({
          where: {
            userId: token.userId,
          },
        });

        token.isAdmin = info?.isAdmin ?? false;
      }

      // Inital Account Setting (login stage)
      if (account) {
        token.userId = account.id;
      }

      return token;
    },
    async session(session, token) {
      if (
        typeof token.isAdmin == "boolean" &&
        typeof token.userId === "string"
      ) {
        session.isAdmin = token.isAdmin;
        session.userId = token.userId;
      }
      return session;
    },
  },

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
});
