import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../trpc/[trpc]";
import { Chance } from "chance";
import { sessionSetting } from "../../../common/constants/session_setting";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "718673669442-l85nvqb53bqsl7dpg07a73hg0grvhvev.apps.googleusercontent.com",
      clientSecret: "l8UHQ0QGkngcIaGWc9JOk5_l"

      // clientId: process.env.GOOGLE_CLIENT_ID,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  session: {
    maxAge: sessionSetting.maxAge,
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const id = user.id;

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
        console.error("Error when login and updaing database")
        console.error(`id = ${id}`)
        console.error(error);
        return false;
      }

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT")

      // Data Syncing (after login stage)
      if (user !== undefined) {
        console.log("Database fetch");
        const info = await prisma.user.findUnique({
          where: {
            userId: user.id,
          },
        });

        token.isAdmin = info?.isAdmin ?? false;
        token.userId = user.id;
      }

      console.log(token)
      return token;
    },
    // session callback, called whenever a session is checked
    async session({ session, token, user }) {


      // Add required field to session
      if (typeof token.isAdmin == "boolean") {
        session.isAdmin = token.isAdmin;
      }
      if (typeof token.userId === "string") {
        session.userId = token.userId;
      }

      return session;
    },
  },

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
});
