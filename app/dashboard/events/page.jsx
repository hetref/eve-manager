"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo/logo.png";
import { auth, db } from "@/firebase";
import useAuthStore from "@/stores/useAuthStore";
import { collection, getDocs } from "firebase/firestore";

const EventsPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const user = auth.currentUser;
  const orgDetails = useAuthStore((state) => state.orgDetails);

  useEffect(() => {
    const getAllEvents = async () => {
      let items = [];
      // Fetch all events from the database
      const querySnapshot = await getDocs(
        collection(
          db,
          "events",
          orgDetails.shortname.replace(/[^\w\s]/gi, "").trim(),
          user.uid
        )
      );
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
      });
      setEventsData(items);
    };
    getAllEvents();
  }, [orgDetails, user.uid]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-7xl w-full mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Events</h1>
          <Link
            href="/dashboard/events/create"
            className="bg-black/90 text-white hover:bg-black/80 rounded px-6 py-4"
          >
            Create Event
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {eventsData &&
            eventsData?.map((item, index) => (
              <Link
                key={index}
                href={`/dashboard/events/${user.uid}/${item.eventName}`}
                className="bg-black/90 text-white rounded px-6 py-4"
              >
                <div className="flex flex-col justify-center items-center">
                  <div className="mb-4">
                    <Image
                      src={logo}
                      alt="Community Logo"
                      className="h-[200px] w-full rounded-full"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl">{item.eventName}</h1>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
