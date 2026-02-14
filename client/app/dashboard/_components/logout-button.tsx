"use client";

import { logoutAction } from "@/actions/logout";

export function LogoutButton() {
  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await logoutAction();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 cursor-pointer"
    >
      Logout
    </button>
  );
}
