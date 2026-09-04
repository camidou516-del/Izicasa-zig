import { getAdminData } from "./actions";
import { AdminReservations } from "@/components/admin/AdminReservations";

export default async function AdminPage() {
  const users = await getAdminData();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
      <div className="admin-dashboard mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#3b82f6]">Administration</p>
        <h1 className="text-3xl font-bold text-[#004d3d]">Utilisateurs et réservations</h1>
      </div>
      <AdminReservations users={users} />
    </main>
  );
}
