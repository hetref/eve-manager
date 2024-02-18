"use client";

import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const RegistrationSearchPage = () => {
  const [emailInput, setEmailInput] = useState("");

  const searchEmailInput = async (e) => {
    e.preventDefault();
    console.log("Search");
    console.log(emailInput);

    const docSnap = await getDocs(collection(db, "participantsQR"));
    docSnap.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   console.log("No such document!");
    // }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter Email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />

      <div>
        <button onClick={searchEmailInput}>Search</button>
      </div>
    </div>
  );
};

export default RegistrationSearchPage;
