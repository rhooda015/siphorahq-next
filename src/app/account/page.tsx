import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth';
import { redirect } from "next/navigation";
import AccountDashboard, { AccountUser } from "@/components/account/AccountDashboard";
import { signOutAction, subscribeAction } from "./actions";

export const metadata = {
  title: "My Account | Siphorahq",
  description: "Manage your Siphorahq experience",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user: AccountUser = {
    name: session.user?.name?.split(" ")[0] || "Guest",
    memberSince: "2024",
    tier: "Heritage Gold",
    activeOrdersCount: 1,
  };

  return (
    <AccountDashboard
      user={user}
      onSignOut={signOutAction}
      onNewsletterSubmit={subscribeAction}
    />
  );
}
