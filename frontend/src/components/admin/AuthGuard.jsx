"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/adminApi";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        await adminApi.getCurrentUser();
        setLoading(false);
      } catch {
        router.replace("/admin/login");
      }
    }

    verify();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}