"use client";

import { db } from "@/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import emailjs from "@emailjs/browser";

const ParticipantEventRegisterPage = () => {
  const [pName, setPName] = useState("");
  const [pEmail, setPEmail] = useState("");
  const [pPhone, setPPhone] = useState("");
  const [pOrg, setPOrg] = useState("");
  const [otp, setOTP] = useState("");
  const [verification, setVerification] = useState(false);
  const [gOtp, setgOtp] = useState("");

  const router = useRouter();

  const pathname = usePathname();
  const parts = pathname.split("/");

  const organization = parts[2];
  const uid = parts[3];
  const eventName = decodeURIComponent(parts[4]);

  const serviceId = "service_l61248r";
  const templateId = "template_5ruyq9e";
  const publicKey = "nIcAjnQR85lcKd5yD";

  const generateRandom4DigitNumber = () => {
    return Math.floor(Math.random() * 9000) + 1000;
  };

  const handleVerifyOTP = () => {
    console.log(otp);
    console.log(gOtp);
    if (otp == gOtp) {
      toast.success("Email verified successfully.");
      setVerification(true);
    } else {
      toast.error("invalid OTP");
      setVerification(false);
    }
    // setOTP("");
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    console.log("clicked");

    if (pEmail !== "") {
      const otpnum = Math.floor(Math.random() * 9000) + 1000;
      setgOtp(otpnum);

      const template_params = {
        from_name: "Eve Manager",
        to_name: pName,
        message: otpnum,
        to_email: pEmail,
      };

      emailjs
        .send(serviceId, templateId, template_params, publicKey)
        .then((response) => {
          console.log("Email Sent:" + { response });
          toast.success("OTP sent to your email.");
        })
        .catch((e) => {
          console.log(e);
        });

      console.log("Loading");
    } else {
      window.alert("Field cannot be empty");
    }
  };

  const generateUniqueId = () => {
    return uuidv4();
  };

  const handleSubmitParticipate = async (e) => {
    e.preventDefault();

    if (!verification) {
      toast.error("Please verify your email.");
      return;
    }

    console.log(pName, pEmail, pPhone, pOrg);

    // Add the participant to the database with this collection structure
    // db, "participants", organization, uid, eventName, "participants", pEmail
    let uniqueId = await generateUniqueId();
    await addDoc(
      collection(db, "participants", organization, uid, eventName, pEmail),
      {
        name: pName,
        email: pEmail,
        phone: pPhone,
        organization: pOrg,
        uniqueId: uniqueId,
      }
    );

    await addDoc(
      collection(db, "participantsQR", pEmail, organization, uid, eventName),
      {
        name: pName,
        email: pEmail,
        phone: pPhone,
        organization: pOrg,
        uniqueId: uniqueId,
      }
    );

    const template_params = {
      from_name: "Eve Manager",
      to_name: pName,
      message: uniqueId,
      to_email: pEmail,
    };

    emailjs
      .send(serviceId, templateId, template_params, publicKey)
      .then((response) => {
        console.log("Email Sent:" + { response });
        toast.success("Registration ID sent to your email.");
      })
      .catch((e) => {
        console.log(e);
      });

    toast.success("You are registered for the event.");
    toast.success(
      "You can check the registration details on 'Check Registrations' page."
    );
    toast.success("Your Registration ID: " + uniqueId);

    console.log("created");
    router.push(`/events/${organization}/${uid}/${eventName}`);
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[60%] p-5 bg-white shadow-md rounded-xl border border-black">
          <h2 className="text-xl font-bold mb-6 text-center">
            Registration Form for {eventName}
          </h2>
          <form onSubmit={handleSubmitParticipate}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your name"
                required
                value={pName}
                onChange={(e) => setPName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium mr-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
                value={pEmail}
                onChange={(e) => setPEmail(e.target.value)}
              />
              <button
                type="button"
                className="ml-2 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                onClick={handleSendOTP}
              >
                Get OTP
              </button>
            </div>
            {!verification && (
              <div className="mb-5">
                <label htmlFor="otp" className="block text-sm font-medium mr-2">
                  OTP
                </label>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  className="mt-1 p-2 flex-grow border border-gray-300 rounded-md"
                />

                <button
                  type="button"
                  className="ml-2 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300"
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </button>
              </div>
            )}
            <div className="mb-5">
              <label htmlFor="phone" className="block text-sm font-medium mr-2">
                Phone No
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your phone"
                required
                value={pPhone}
                onChange={(e) => setPPhone(e.target.value)}
              />
              {/* <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 p-2 flex-grow border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
                required
                value={pPhone}
                onChange={(e) => setPPhone(e.target.value)}
              /> */}
            </div>
            <div className="mb-5">
              <label
                htmlFor="organization"
                className="block text-sm font-medium"
              >
                Organization Name
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your organization name"
                required
                value={pOrg}
                onChange={(e) => setPOrg(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParticipantEventRegisterPage;
