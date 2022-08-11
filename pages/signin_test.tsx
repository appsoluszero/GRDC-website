import { getSession, signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { trpc } from "../common/hooks/trpc";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

export default function SignInTest() {
  const router = useRouter();
  const [session, loading] = useSession();
  const { mutateAsync: setAdmin, isLoading } =
    trpc.useMutation("test.set_admin");

  return (
    <div>
      {session ? (
        <button onClick={() => signOut()}>SignOut</button>
      ) : (
        <>
          <button onClick={() => signIn()}>SignIn</button>
          <br />
          <button onClick={() => signIn("google")}>SignIn with Google</button>
        </>
      )}
      {loading && <span>Loading...</span>}

      {session && (
        <>
          <h3>User Session</h3>
          <code style={{ whiteSpace: "pre" }}>
            {JSON.stringify(session, null, 2)}
          </code>
          <br />
          {session.user?.image && (
            <Image
              src={session.user?.image}
              width={100}
              height={100}
              alt="Profile Image"
            />
          )}

          <h3>Debug</h3>
          <button
            onClick={async () => {
              setAdmin(!session.isAdmin);
              router.reload();
            }}
            disabled={isLoading}
          >
            {session.isAdmin ? "Unset Admin" : "Set Admin"}
          </button>
        </>
      )}

      <h3>Control</h3>

      <br />
    </div>
  );
}
