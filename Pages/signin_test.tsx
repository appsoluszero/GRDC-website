import { signIn, signOut, useSession } from "next-auth/client";
import React from "react";

export default function SignInTest() {
  const [session, loading] = useSession();

  const imageSrc = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;
  const accessToken = session?.accessToken;

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
          <p>{JSON.stringify(session)}</p>
        </>
      )}

      {imageSrc && <img src={imageSrc} />}
      <br />
      {name && <span>{name}</span>}
      {email && <i> ({email})</i>}
      <br />
      {accessToken && <span>{accessToken}</span>}
    </div>
  );
}
