'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

/** Admin avatar + sign-out in the console top bar. */
export function AdminUserBadge() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const initials =
    ((user?.firstName?.[0] ?? 'A') + (user?.lastName?.[0] ?? '')).toUpperCase() || 'AD';

  const signOut = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <span
        title={user ? `${user.firstName} ${user.lastName}` : 'Admin'}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate font-mono text-caption text-brass"
      >
        {initials}
      </span>
      <button
        onClick={signOut}
        aria-label="Sign out"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite text-stone transition-colors hover:text-crimson"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
