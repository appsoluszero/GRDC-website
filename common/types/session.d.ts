import NextAuth from "next-auth";

// Augmentation of  type Session
declare module "next-auth" {
  interface Session {
    role: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    role: number;
  }
}
