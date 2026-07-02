'use client';

import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/config";

export default function LogoutButton() {
  const router = useRouter();

async function handleLogout() {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    console.log("Logout status:", res.status);

    const data = await res.json();
    console.log(data);

    window.location.href = "/";
  } catch (err) {
    console.error(err);
  }
}

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