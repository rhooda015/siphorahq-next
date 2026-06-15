"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOutAction() {
  // Clear next-auth cookies manually for Server Action sign out
  const cookieStore = await cookies();
  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("__Secure-next-auth.session-token");
  cookieStore.delete("next-auth.callback-url");
  cookieStore.delete("__Secure-next-auth.callback-url");
  cookieStore.delete("next-auth.csrf-token");
  
  redirect("/login");
}

export async function subscribeAction(email: string) {
  // Mock newsletter subscription
  // In a real app, you would send this to your API route
  return new Promise<{ ok: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      resolve({ ok: true, message: "You're on the list. Welcome to the Siphora circle." });
    }, 1000);
  });
}
