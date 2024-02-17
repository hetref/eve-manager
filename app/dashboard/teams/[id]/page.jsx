import React from "react";

const page = () => {
  return (
    // <div>
    <div className="my-6 py-4 flex flex-col items-center w-full">
      <div className="mb-10 max-w-7xl w-full bg-black/90 text-white rounded px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-l text-white/80">Team Admin</span>{" "}
            <h1 className="text-2xl mt-2">Aryan Shinde</h1>
          </div>
          <div className="flex gap-8 text-xl">
            <a href="#">Phone</a>
            <a href="#">Email</a>
          </div>
        </div>
      </div>

      <hr className=" w-full max-w-7xl" />

      <hr className="mt-10 bg-black" />
      <div className="mb-8 max-w-7xl w-full bg-black/90 text-white rounded px-8 py-6">
        <div className="flex justify-between">
          <h1 className="text-2xl text-white/80">Team Members</h1>
          <button className="px-6 py-2 bg-white/80 text-black/90 hover:bg-white/70 hover:text-black duration-200 rounded">
            Add Member 3/5
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <a
            href="mailto:shindearyan179@gmail.com"
            className="tet-xl hover:underline hover:text-white/80"
          >
            Aryan Again
          </a>
          <a
            href="mailto:shindearyan179@gmail.com"
            className="tet-xl hover:underline hover:text-white/80"
          >
            Aryan Again
          </a>
          <a
            href="mailto:shindearyan179@gmail.com"
            className="tet-xl hover:underline hover:text-white/80"
          >
            Aryan Again
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
