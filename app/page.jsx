import Image from "next/image";
import logo from "@/assets/logo/logo.png";
import { GrLinkNext } from "react-icons/gr";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className=" h-24 bg-black/80 text-white flex justify-center items-center">
        <h1 className="text-3xl font-mono font-bold tracking-wider">
          EVE MANAGER
        </h1>
      </nav>
      <div className="flex justify-center w-full items-center">
        <div className="max-w-7xl w-full ">
          <div className="flex justify-center items-center h-[calc(100svh-6rem)]">
            <div className="flex justify-center items-center w-full rounded py-[6%] px-[4%] border-2 border-black">
              <div className="w-full h-full px-10">
                <h1 className="text-4xl mb-4 font-bold leading-[2.8rem]">
                  Worrying about Events Management?
                </h1>
                <p className="text-xl mb-10">
                  We got you covered. With our easy to use platform, you can
                  manage your events with ease.
                </p>
                <Link
                  href="/account/register"
                  className="text-xl bg-black/80 text-white px-8 py-4 rounded hover:text-white/80 duration-300 flex gap-4 justify-center items-center"
                >
                  Get Started <GrLinkNext />
                </Link>
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
