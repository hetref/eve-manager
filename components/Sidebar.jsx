"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    href: "/video",
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">Eve Manager</h1>
        </Link>
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ${
              pathname === "/dashboard"
                ? "text-white bg-white/10"
                : "text-zinc-400"
            }`}
          >
            <div className="flex items-center flex-1">Label</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
