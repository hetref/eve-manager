"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import EventLayout from "@/components/EventLayout";
import useAuthStore from "@/stores/useAuthStore";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const EventPage = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");

  // Assuming your URL structure is consistent, you can access userId and eventName like this
  const orgDetails = useAuthStore((state) => state.orgDetails);
  const userId = parts[3];
  const eventName = decodeURIComponent(parts[4]);

  useEffect(() => {
    console.log(pathname);
    console.log(parts);
    console.log(userId);
    console.log(eventName);
  }, [pathname, parts, userId, eventName]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-7xl w-full mt-10">
        <Link
          href={`http://localhost:3000/events/${orgDetails.shortname}/${userId}/${eventName}`}
          className="flex items-center gap-4 text-[18px]"
          target="_blank"
        >
          https://localhost:3000/events/{orgDetails.shortname}/{userId}/
          {eventName} <FaExternalLinkAlt />
        </Link>
        <EventLayout view={false} />
      </div>
    </div>
  );
};

export default EventPage;
