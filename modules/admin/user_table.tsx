import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { trpc } from "../../common/hooks/trpc";

export default function UserTable() {
  const [session, loading] = useSession();
  const { data: users, error, refetch } = trpc.useQuery(["user.all"]);
  const setAdmin = trpc.useMutation("user.set_admin");

  const router = useRouter();

  if (error) {
    return <span>{error}</span>;
  }

  if (!users) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>Email</th>
          <th>Admin?</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.userId}>
            <td>{user.userId}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? "YES" : "NO"}</td>
            <td>
              <button
                disabled={setAdmin.isLoading}
                onClick={async () => {
                  const isYourUser = session?.userId === user.userId;
                  if (
                    isYourUser &&
                    !confirm("Confirm revoking yours admin privilege?")
                  ) {
                    return;
                  }
                  await setAdmin.mutateAsync({
                    userId: user.userId,
                    to: !user.isAdmin,
                  });

                  if (isYourUser) {
                    router.reload();
                  } else {
                    refetch();
                  }
                }}
              >
                {user.isAdmin ? "Revoke Admin" : "Make Admin"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
