'use client';

import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/config";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.replace("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-sm text-gray-300 transition"
    >
      Log out
    </button>
  );
}