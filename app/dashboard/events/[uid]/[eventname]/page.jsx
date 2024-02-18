"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import EventLayout from "@/components/EventLayout";
import useAuthStore from "@/stores/useAuthStore";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";

const EventPage = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");

  // Assuming your URL structure is consistent, you can access userId and eventName like this
  const orgDetails = useAuthStore((state) => state.orgDetails);
  const userId = parts[3];
  const eventName = decodeURIComponent(parts[4]);

  const handleUploadFeaturedLogo = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.error(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log("File available at", url);
            // Add the URL to Firestore
            // const docRef = doc(db, "your-collection", "your-document-id");
            // setDoc(docRef, { imageUrl: url }, { merge: true })
            //   .then(() => {
            //     console.log("Document successfully updated with image URL");
            //   })
            //   .catch((error) => {
            //     console.error("Error updating document: ", error);
            //   });
          });
      }
    );
  };

  useEffect(() => {
    console.log(pathname);
    console.log(parts);
    console.log(userId);
    console.log(eventName);
  }, [pathname, parts, userId, eventName]);

  const deleteEventDB = async () => {
    try {
      // Delete event from database
      await deleteDoc(
        doc(db, "events", orgDetails.shortname, userId, eventName)
      );
      console.log("Deleting event from database...");
      console.log("Deleted event from database successfully!");
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event from database: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-7xl w-full mt-10">
        <div className="flex justify-between">
          <Link
            href={`http://localhost:3000/events/${orgDetails.shortname}/${userId}/${eventName}`}
            className="flex items-center gap-4 text-[18px]"
            target="_blank"
          >
            https://localhost:3000/events/{orgDetails.shortname}/{userId}/
            {eventName} <FaExternalLinkAlt />
          </Link>
          <Link
            href={`/dashboard/events/${userId}/${eventName}/analytics`}
            className="bg-black/90 rounded text-white/90 hover:bg-black/80 hover:text-white px-6 py-2"
          >
            Analytics
          </Link>
        </div>
        <EventLayout eventNameParam={eventName} />
        <button
          className="w-full bg-red-900 text-white py-4 text-xl mt-8 rounded"
          onClick={deleteEventDB}
        >
          Delete Event
        </button>
      </div>
    </div>
  );
};

export default EventPage;
