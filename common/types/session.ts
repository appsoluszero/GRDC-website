import NextAuth from "next-auth";

// Augmentation of  type Session
declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
}
