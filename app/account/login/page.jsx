"use client";

import Link from "next/link";
import React from "react";

const page = () => {
  const loginHandle = () => {
    console.log("Logged In");
  };

  return (
    <div className="flex justify-center items-center h-[100svh]">
      <div className="max-w-7xl">
        <div className="flex justify-center text-center flex-col w-full border-2 border-black/80 px-[6rem] py-[4rem] rounded">
          <h1 className="text-4xl font-bold font-mono mb-4">Login Now!</h1>
          <span className="mb-8 text-xl">
            Welcome back! We are glad you are here again.
          </span>
          <form
            onSubmit={loginHandle}
            className="flex flex-col w-full justify-center items-center mb-8"
          >
            <div className="flex flex-col w-full gap-4 mb-8">
              <input
                type="text"
                placeholder="Email Here ..."
                className=" border-2 border-black/80 w-[500px] rounded px-6 py-2"
              />
              <input
                type="password"
                placeholder="Password Here ..."
                className=" border-2 border-black/80 w-[500px] rounded px-6 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-[250px] text-xl bg-black/80 text-white px-6 py-3 rounded hover:text-white/80 duration-300 flex gap-4 justify-center items-center"
            >
              Login
            </button>
          </form>
          <Link href="/account/forgot" className="text-right mb-2">
            Forgot Password
          </Link>
          <Link href="/account/register" className="text-right">
            Not a user? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
