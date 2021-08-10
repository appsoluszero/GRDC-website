import { TRPCError } from "@trpc/server";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export function signInGuard(token: JWT | null): JWT {
  if (token) {
    return token;
  }
  throw new TRPCError({ code: "UNAUTHORIZED", message: "Not Signin" });
}

export function adminGuard(token: JWT | null) {
  const _token = signInGuard(token);

  if (_token.isAdmin) {
    return _token;
  }
  throw new TRPCError({
    code: "UNAUTHORIZED",
    message: "Not an admin",
  });
}
