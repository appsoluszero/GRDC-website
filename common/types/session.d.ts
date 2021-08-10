import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { z } from "zod";

// Augmentation of  type Session
declare module "next-auth" {
  interface Session {
    userId: string;
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    isAdmin: boolean;
  }
}
