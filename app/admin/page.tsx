import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAdminData } from "./actions";
import { AdminReservations } from "@/components/admin/AdminReservations";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.role !== "ADMIN") {
    redirect("/");
  }

  const { users, inscriptions, quoteRequests, packOrders } = await getAdminData();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
      <div className="mb-8 overflow-hidden rounded-b-2xl bg-[#113e31] px-6 py-8 text-white shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#b6f2d4]">
          ADMINISTRATION
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Tableau de bord administrateur
        </h1>
      </div>

      <AdminReservations
        users={users}
        inscriptions={inscriptions}
        quoteRequests={quoteRequests}
        packOrders={packOrders}
      />
    </main>
  );
}