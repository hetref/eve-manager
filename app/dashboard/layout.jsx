"use client";

import { Sidebar } from "@/components/Sidebar";
import { auth, db } from "@/firebase";
import useAuthStore from "@/stores/useAuthStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = ({ children }) => {
  const [paid, setPaid] = useState();
  const [isNew, setIsNew] = useState();

  const router = useRouter();
  const pathname = usePathname();

  const userStatus = useAuthStore((state) => state.userStatus);
  const setOrgDetails = useAuthStore((state) => state.setOrgDetails);
  const orgDetails = useAuthStore((state) => state.orgDetails);

  const user = auth.currentUser;

  if (userStatus === undefined && !userStatus) {
    redirect("/");
  }

  // const getUserRole = async (user) => {
  //   const querySnapshot = await getDocs(collection(db, "organizations"));
  //   querySnapshot.forEach((doc) => {
  //     // console.log(`${doc.id} => ${doc.data()}`);
  //     if (doc.data().email === user.email) {
  //       console.log("User is normal user");
  //       setIsOrgAdmin(false);
  //     } else {
  //       console.log("User is organization");
  //       setIsOrgAdmin(true);
  //     }
  //   });
  // };

  const paybuttonHandle = async () => {
    // Set the document
    setDoc(doc(db, "organizations", user.uid), {
      ...orgDetails,
      paid: true,
    }).then(() => {
      console.log(user);
      console.log("PUSHING to DASHBOARD");
      router.push("/dashboard");
    });
  };

  useEffect(() => {
    const getPaidAndIsNew = async () => {
      const docRef = doc(db, "organizations", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setOrgDetails(docSnap.data());
        setPaid(docSnap.data().paid);
        setIsNew(docSnap.data().info);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    if (userStatus) {
      getPaidAndIsNew();
    }
  }, [userStatus, user?.uid]);

  return (
    <>
      {/* {userStatus === undefined && (
        <div>
          <h1>Loading</h1>
        </div>
      )}

      {userStatus === false && (
        <div>
          <h1>Not Logged In</h1>
          <Link href="/login">Login</Link>
        </div>
      )} */}

      {userStatus === true && (
        <div className="h-full relative">
          {paid === false && (
            <div className="bg-red-500 text-white p-4">
              <h1>Your organization is not paid</h1>
              <button onClick={paybuttonHandle}>Pay Now</button>
            </div>
          )}
          {paid === true && (
            <>
              {/* {isNew === false && (
                <>
                  {pathname === "/dashboard/settings" && (
                    <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
                      <Sidebar />
                    </div>
                  )}
                  {pathname !== "/dashboard/settings" && (
                    <div>
                      <AddInfo />
                    </div>
                  )}
                </>
              )} */}
              {/* {isNew === true && (
                <> */}
              <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
                <Sidebar />
              </div>
              <main className="md:pl-72 pb-10">{children}</main>
              {/* </>
              )} */}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
