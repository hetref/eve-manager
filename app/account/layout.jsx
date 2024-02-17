"use client";

import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

const AccountPage = ({ children }) => {
  const router = useRouter();

  const userStatus = useAuthStore((state) => state.userStatus);

  if (userStatus === undefined || userStatus === true) {
    router.push("/");
    return (
      <div className="flex justify-center items-center h-[100svh] text-black/90 text-2xl font-bold tracking-wide">
        Loading
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AccountPage;
