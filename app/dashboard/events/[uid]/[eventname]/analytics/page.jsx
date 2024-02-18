"use client";

import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { usePathname } from "next/navigation";

const AnalyticsPage = () => {
  // Fetch the data from the database
  // Database structure: organization and then query for the organization name
  const orgDetails = useAuthStore((state) => state.orgDetails);

  const pathname = usePathname();
  const parts = pathname.split("/");

  // Assuming your URL structure is consistent, you can access userId and eventName like this
  const userId = parts[3];
  const eventName = decodeURIComponent(parts[4]);

  useEffect(() => {
    const getData = async () => {
      const docs = doc(
        db,
        "participants",
        orgDetails.shortname,
        userId,
        eventName
      );
      const docSnap = await getDoc(docs);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getData();
  }, [orgDetails.shortname, userId, eventName]);

  return <div>page</div>;
};

export default AnalyticsPage;
