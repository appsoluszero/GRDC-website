import { signIn, signOut, useSession } from "next-auth/client";
import React from "react";
import { trpc } from "../common/hooks/trpc";
import Image from "next/image";

export default function SignInTest() {
  const [session, loading] = useSession();
  const { data, refetch } = trpc.useQuery(["test"]);

  const imageSrc = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;

  return (
    <div>
      <code style={{ whiteSpace: "pre" }}>{JSON.stringify(data, null, 2)}</code>
      <br />
      <button onClick={() => refetch()}>Refetch</button>
      <br />

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
        </>
      )}

      {imageSrc && (
        <Image src={imageSrc} width={500} height={500} alt="Profile Image" />
      )}
      <br />
      {name && <span>{name}</span>}
      {email && <i> ({email})</i>}
    </div>
  );
}
