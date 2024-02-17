"use client";

import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OrgRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [shortName, setShortName] = useState("");

  const router = useRouter();

  const registerHandle = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        setDoc(doc(db, "organizations", user.uid), {
          name,
          email,
          role: "organization",
          shortname: shortName,
          organization: orgName,
          paid: false,
          info: false,
        }).then(() => {
          console.log(user);
          console.log("PUSHING to DASHBOARD");
          router.push("/dashboard");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-[100svh]">
      <div className="max-w-7xl">
        <div className="flex justify-center text-center flex-col w-full border-2 border-black/80 px-[6rem] py-[4rem] rounded">
          <h1 className="text-4xl font-bold font-mono mb-4">
            Organization Registration!
          </h1>
          <span className="mb-8 text-xl">
            Get your organization on this portal to benefit from the most
            demanding features!
          </span>
          <form
            onSubmit={registerHandle}
            className="flex flex-col w-full justify-center items-center mb-8"
          >
            <div className="flex flex-col w-full gap-4 mb-8 justify-center items-center">
              <input
                type="text"
                placeholder="Your Name ..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" border-2 border-black/80 w-[500px] rounded px-6 py-2"
              />
              <input
                type="text"
                placeholder="Organization Name ..."
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className=" border-2 border-black/80 w-[500px] rounded px-6 py-2"
              />
              <input
                type="text"
                placeholder="Organization Short Name ..."
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                maxLength={14}
                className=" border-2 border-black/80 w-[500px] rounded px-6 py-2"
              />
              <input
                type="email"
                placeholder="Your Email Here ..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" border-2 border-black/80 w-[500px] rounded px-6 py-2"
              />
              <input
                type="password"
                placeholder="Your Password Here ..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" border-2 border-black/80 w-[500px] rounded px-6 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-[250px] text-xl bg-black/80 text-white px-6 py-3 rounded hover:text-white/80 duration-300 flex gap-4 justify-center items-center"
            >
              Register
            </button>
          </form>
          <Link href="/account/register" className="text-right mb-2">
            Register as User
          </Link>
          <Link href="/account/login" className="text-right">
            Already the Organization? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrgRegister;
