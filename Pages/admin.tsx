import AdminGuard from "../common/components/guard/admin_guard";
import UserTable from "../modules/admin/user_table";

export default function AdminControl() {
  return (
    <AdminGuard>
      <div>
        <h3>User Table</h3>
        <UserTable />
      </div>
    </AdminGuard>
  );
}
