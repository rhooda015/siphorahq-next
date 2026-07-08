import React from 'react';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import StudioSidebar from '@/components/studio/StudioSidebar';
import StudioTopbar from '@/components/studio/StudioTopbar';

async function checkStudioAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return false;

    const SECRET = new TextEncoder().encode(
      process.env.NEXTAUTH_SECRET || 'fallback_secret_32_chars_minimum!!'
    );
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export const metadata = {
  title: 'Siphorahq AI Studio',
  description: 'Enterprise AI Creative, Marketing & E-commerce Operating System',
};

export default async function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = await checkStudioAuth();

  if (!isAuthed) {
    redirect('/admin/login');
  }

  return (
    <div className="flex h-screen bg-[#0A0E1A] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <StudioSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <StudioTopbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
