"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed.");
      }

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Admin logout error:", error);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="
        inline-flex
        items-center
        gap-2
        rounded-lg
        border
        border-primary-100
        bg-white
        px-4
        py-2
        text-sm
        font-medium
        text-primary-hover
        transition
        hover:border-primary
        hover:text-primary
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      <LogOut size={16} />

      {loading ? "Signing out..." : "Log Out"}
    </button>
  );
}