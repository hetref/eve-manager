"use client";

import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const registerHandle = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          role: "normal",
          organization: null,
        });
        console.log(user);
        console.log("PUSHING to DASHBOARD");
        router.push("/dashboard");
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
          <h1 className="text-4xl font-bold font-mono mb-4">Register Now!</h1>
          <span className="mb-8 text-xl">
            Get registered to the exclusive portal!
          </span>
          <form
            onSubmit={registerHandle}
            className="flex flex-col w-full justify-center items-center mb-8"
          >
            <div className="flex flex-col w-full gap-4 mb-8">
              <input
                type="text"
                placeholder="Your Name Here ..."
                value={name}
                onChange={(e) => setName(e.target.value)}
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
          <Link
            href="/account/organization/register"
            className="text-right mb-2"
          >
            Register as Organization
          </Link>
          <Link href="/account/login" className="text-right">
            Already the user? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
