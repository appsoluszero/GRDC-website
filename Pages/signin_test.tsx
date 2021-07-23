import { signIn, signOut, useSession } from "next-auth/client";
import React from "react";
import useSWR, { mutate } from "swr";
import { testDatabase } from "../common/constants/testDatabase";

export default function SignInTest() {
  const [session, loading] = useSession();

  const imageSrc = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;

  const { data, error, isValidating } = useSWR("/news");

  return (
    <div>
      <div>
        <span>isValidating: {JSON.stringify(isValidating)}</span>
        <br />
        {JSON.stringify(data)}
        <br />
        {error && (
          <span>
            <b>ERROR:</b>
            {JSON.stringify(error)}
          </span>
        )}
        <br />
        <button
          onClick={() => {
            testDatabase["/post"].ok = false;
            mutate("/post");
          }}
        >
          ADD STUFF
        </button>
      </div>

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
    </div>
  );
}
