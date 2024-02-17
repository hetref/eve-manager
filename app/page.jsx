"use client";

import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { GrLinkNext } from "react-icons/gr";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import useAuthStore from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");

  const userStatus = useAuthStore((state) => state.userStatus);
  const setUserStatus = useAuthStore((state) => state.setUserStatus);
  const setIsOrgAdmin = useAuthStore((state) => state.setIsOrgAdmin);

  const getUserRole = async (user) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      if (doc.data().email === user.email) {
        console.log("User is normal user");
        setIsOrgAdmin(false);
      } else {
        console.log("User is organization");
        setIsOrgAdmin(true);
      }
    });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // ...

      getUserRole(user);

      setUserStatus(true);
      setUserEmail(user.email);
      console.log(userStatus);
    } else {
      // User is signed out
      // ...
      setUserStatus(false);
    }
  });

  useEffect(() => {
    if (userStatus === undefined) {
      console.log("Loading");
    } else if (userStatus === true) {
      console.log("User Logged In");
    } else {
      console.log("User Logged Out");
    }
  }, [userStatus]);

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
      <div className="flex justify-center w-full items-center">
        <div className="max-w-7xl w-full ">
          {userStatus === true && (
            <h1 className="text-center mt-10 text-2xl font-bold">
              Welcome {userEmail}
            </h1>
          )}
          <div className="flex gap-6 justify-center items-center h-[calc(100svh-20rem)]">
            <div className="flex justify-center items-center w-full rounded px-[4%] border-2 border-black">
              <div className="w-full h-full px-10">
                <h1 className="text-4xl mb-4 font-bold leading-[2.8rem]">
                  Worrying about Events Management?
                </h1>
                <p className="text-xl mb-10">
                  We got you covered. With our easy to use platform, you can
                  manage your events with ease.
                </p>
                {userStatus === undefined && (
                  <span className="text-xl bg-black/80 text-white px-8 py-4 rounded hover:text-white/80 duration-300 flex gap-4 justify-center items-center">
                    Loading <AiOutlineLoading className="animate-spin" />
                  </span>
                )}
                {userStatus === true && (
                  <Link
                    href="/dashboard"
                    className="text-xl bg-black/80 text-white px-8 py-4 rounded hover:text-white/80 duration-300 flex gap-4 justify-center items-center"
                  >
                    Go to Dashboard <GrLinkNext />
                  </Link>
                )}
                {userStatus === false && (
                  <Link
                    href="/account/register"
                    className="text-xl bg-black/80 text-white px-8 py-4 rounded hover:text-white/80 duration-300 flex gap-4 justify-center items-center"
                  >
                    Get Started <GrLinkNext />
                  </Link>
                )}
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <Image
                  src={logo}
                  alt="Logo"
                  className="w-[80%] h-[80%] border-2 border-black rounded-full p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
