"use client";

import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CommunityCard = () => {
  const pathname = usePathname();

  return (
    <Link
      href="/dashboard/communities/1234"
      className="bg-black/80 text-white rounded px-6 py-4"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="mb-4">
          <Image
            src={logo}
            alt="Community Logo"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div>
          <h1 className="text-xl">
            {pathname === "/dashboard/communities"
              ? "Community Name"
              : "Team Name"}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
