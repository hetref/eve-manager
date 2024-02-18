"use client";

import { auth, db } from "@/firebase";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { LuDot } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";
// import { WhatsappShareButton, WhatsappIcon } from "next-share";

const ParticipantEventPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const user = auth.currentUser;
  const orgDetails = useAuthStore((state) => state.orgDetails);

  const pathname = usePathname();
  const parts = pathname.split("/");

  const organization = parts[2];
  const uid = parts[3];
  const eventName = decodeURIComponent(parts[4]);

  console.log(parts);
  console.log(organization);
  console.log(uid);
  console.log(eventName);

  useEffect(() => {
    const getAllEvents = async () => {
      let items = [];
      const docRef = doc(db, "events", organization, uid, eventName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        items.push(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      setEventsData(items);
    };

    getAllEvents();
  }, [orgDetails, uid, eventName, organization]);

  eventsData.length != 0 && console.log(eventsData);

  return (
    <div>
      <nav className=" h-24 bg-black/80 text-white flex justify-center items-center">
        <Link href="/" className="text-3xl font-mono font-bold tracking-wider">
          EVE MANAGER
        </Link>
        <Link
          href="/user/registrations"
          className="ml-10 bg-white/80 text-black/90 px-6 py-3 rounded hover:bg-white/90 duration-300"
        >
          Check Registrations
        </Link>
      </nav>
      <div className="mt-6 mb-10">
        <div>
          <div className="flex justify-center items-center w-full">
            <div className="max-w-7xl w-full mt-10">
              <div
                className={`bg-black/40 rounded flex flex-col py-4 h-[300px] justify-center items-center`}
              >
                <Image
                  src={logo}
                  className="h-[300px] w-full object-cover"
                  alt="Featured Image"
                />
              </div>

              <hr className="mt-8 mb-8" />

              <div className={`flex w-full gap-8 items-center`}>
                <div
                  className={`bg-black/40 w-[50%] rounded flex flex-col justify-center items-center`}
                >
                  <Image
                    src={logo}
                    className="h-[360px] w-full object-cover"
                    alt="Logo Image"
                  />
                </div>
                <div className={`w-[60%] flex flex-col px-6`}>
                  <h1 className="text-4xl font-bold mb-6">
                    {eventsData[0]?.eventName}
                  </h1>
                  <p className="mb-4">
                    <b>Location</b>
                    <br />
                    {eventsData[0]?.eventLocation}
                  </p>
                  <p className="mb-4">
                    <b>Deadline</b> <br />
                    {eventsData[0]?.deadlineDate}
                  </p>
                  <p className="mb-4">
                    <b>Date</b> <br /> {eventsData[0]?.eventDate}
                  </p>
                  <p className="mb-4">
                    <b>Registration Link</b>
                    <br />
                    <Link
                      className=""
                      href={`http://localhost:3000/events/${organization}/${uid}/${eventName}/register`}
                      alt="Event Registration Link"
                    >
                      http://localhost:3000/events/{organization}/{uid}/
                      {eventName}/register
                    </Link>
                  </p>
                  <div>
                    Share on
                    {/* <InstagramShareButton
                      link={`http://localhost:3000/${pathname}`}
                    >
                      <InstagramIcon size={32} round />
                    </InstagramShareButton> */}
                  </div>
                </div>
              </div>

              <hr className="mt-8 mb-8" />

              <div className={`px-6 p-0 m-0 rounded`}>
                <p>{eventsData[0]?.aboutEvent}</p>
              </div>

              <hr className="mt-8 mb-8" />

              <div>
                <h1 className="text-xl font-bold tracking-wide mb-4">
                  Eligibility
                </h1>
                <div>
                  <ul className="ml-6">
                    {eventsData[0]?.eligibility.map((item, index) => (
                      <li key={index}>
                        <p className="border-black/90 px-4 py-2 rounded mb-2 flex gap-2 items-center">
                          <LuDot /> {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <hr className="mt-8 mb-8" />

              <div>
                <h1 className="text-xl font-bold tracking-wide mb-4">
                  Schedule
                </h1>
                <div>
                  <ul className="ml-6">
                    {eventsData[0]?.schedule.map((item, index) => (
                      <li key={index}>
                        <p className="border-black/90 px-4 py-2 rounded mb-2 flex gap-2 items-center">
                          <LuDot /> {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <hr className="mt-8 mb-8" />

              <div>
                <h1 className="text-xl font-bold tracking-wide mb-4">
                  Guidlines
                </h1>
                <div>
                  <ul className="ml-6">
                    {eventsData[0]?.guidelines.map((item, index) => (
                      <li key={index}>
                        <p className="border-black/90 px-4 py-2 rounded mb-2 flex gap-2 items-center">
                          <LuDot /> {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <hr className="mt-8 mb-8" />

              <div>
                <h1 className="text-xl font-bold tracking-wide mb-4">Prizes</h1>
                <div>
                  <ul className="ml-6">
                    {eventsData[0]?.prizes.map((item, index) => (
                      <li key={index}>
                        <p className="border-black/90 px-4 py-2 rounded mb-2 flex gap-2 items-center">
                          <LuDot /> {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <hr className="mt-8 mb-8" />

              <div>
                <h1 className="text-xl font-bold tracking-wide mb-4">
                  Judging Criteria
                </h1>
                <div className={`px-6 p-0 m-0 rounded ml-6 mb-6`}>
                  <p>{eventsData[0]?.judgingCriteria.text}</p>
                </div>
                <div>
                  <ul className="ml-8">
                    {eventsData[0]?.judgingCriteria.list.map((item, index) => (
                      <li key={index}>
                        <p className="border-black/90 px-4 py-2 rounded mb-1 flex gap-2 items-center">
                          <LuDot /> {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 w-full">
                <button className="w-full rounded bg-black/90 text-white hover:bg-black/80 py-4 text-xl">
                  <Link
                    href={`http://localhost:3000/events/${organization}/${uid}/${eventName}/register`}
                  >
                    Register
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantEventPage;
