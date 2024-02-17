"use client";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Organization",
    href: "/dashboard/organization",
  },
  // {
  //   label: "Communities",
  //   href: "/dashboard/communities",
  // },
  // {
  //   label: "Teams",
  //   href: "/dashboard/teams",
  // },
  {
    label: "Events",
    href: "/dashboard/events",
  },
  // {
  //   label: "Newsletter",
  //   href: "/dashboard/newsletter",
  // },
  {
    label: "Settings",
    href: "/dashboard/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const orgDetails = useAuthStore((state) => state.orgDetails);

  useEffect(() => {
    console.log("DEAILS", orgDetails);
  }, [orgDetails]);

  const logoutHandle = () => {
    console.log("LOGGED OUT");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-black/80 text-white">
      <div className="px-3 py-2 flex-1">
        <Link
          href="/dashboard"
          className="flex items-center justify-center pl-3 mb-6"
        >
          <h1 className="text-2xl font-bold">Eve Manager</h1>
        </Link>
        <hr className="w-full bg-white mb-10" />
        <div>
          <h4 className="ml-2 text-gray-300 tracking-wide">Organization:</h4>
          <h1 className="mb-6 ml-2 text-xl font-bold tracking-wider">
            {orgDetails?.shortname}
          </h1>
        </div>
        <div>
          <h4 className="ml-2 text-gray-300 tracking-wide">User Status:</h4>
          <h1 className="mb-6 ml-2 text-xl font-bold tracking-wider">
            Organization
          </h1>
        </div>
        <div>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition ${
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
                }`}
              >
                <div className="flex items-center flex-1">{route.label}</div>
              </Link>
            ))}
            <button
              onClick={logoutHandle}
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400"
            >
              <div className="flex items-center flex-1">Logout</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
