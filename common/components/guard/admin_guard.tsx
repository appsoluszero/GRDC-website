import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import React from "react";

export interface AdminGuardProps {
  children: JSX.Element;
  type: "" | "";
  ssr?: boolean;
  loadingElement?: JSX.Element;
}

export default function AdminGuard(props: AdminGuardProps) {
  const [session, loading] = useSession();

  if (props.ssr && typeof window === "undefined") {
    return props.children;
  }

  if (loading) {
    return props.loadingElement ?? <text>Loading...</text>;
  }

  if (!session) {
    return (
      <>
        <text>Must Signin</text>
        <button onClick={() => signIn()}>SignIn</button>
      </>
    );
  }

  if (!session.isAdmin) {
    return <text>Not Admin</text>;
  }

  return props.children;
}
