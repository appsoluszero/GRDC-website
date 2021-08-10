import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/client";
import { XOR } from "ts-xor";

type NavLink = { name: string; element?: JSX.Element } & XOR<
  { href?: string },
  { action?: () => void }
>;

export const navLinks: (
  | NavLink
  | ((session: Session | null) => NavLink | null)
)[] = [
  { name: "Home", href: "/" },
  { name: "Showcase" },
  { name: "News", href: "/news" },
  { name: "Contact" },
  (session) =>
    session
      ? {
          name: "Signout",
          action: () => confirm("Confirm Signout?") && signOut(),
        }
      : { name: "SignIn", action: () => signIn("google") },
  (session) => session?.isAdmin && { name: "Admin", href: "/admin" },
];
