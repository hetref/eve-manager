"use client";

import { auth, db } from "@/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegPlusSquare } from "react-icons/fa";
import useAuthStore from "@/stores/useAuthStore";
import { redirect, useRouter } from "next/navigation";

const EventCreate = () => {
  const [featureImage, setFeatureImage] = useState([]);
  const [logoImage, setLogoImage] = useState([]);
  const [eventName, setEventName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [aboutEvent, setAboutEvent] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eligibility, setEligibility] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [judgingCriteria, setJudgingCriteria] = useState({
    text: "",
    list: [],
  });
  const user = auth.currentUser;

  const router = useRouter();

  const orgDetails = useAuthStore((state) => state.orgDetails);

  //   Add the prompt values to the list of eligibility, schedule, prizes, and guidelines
  const handleEligibility = (e) => {
    e.preventDefault();
    setEligibility([...eligibility, prompt("Eligibility")]);
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    setSchedule([...schedule, prompt("Schedule")]);
  };

  const handlePrizes = (e) => {
    e.preventDefault();
    setPrizes([...prizes, prompt("Prizes")]);
  };

  const handleGuidelines = (e) => {
    e.preventDefault();
    setGuidelines([...guidelines, prompt("Guidelines")]);
  };

  const handleJudgingCriteria = (e) => {
    e.preventDefault();
    setJudgingCriteria({
      text: judgingCriteria.text,
      list: [...judgingCriteria.list, prompt("Judging Criteria")],
    });
  };

  const handleCreateEvent = () => {
    console.log("Create Event");
    console.log("Feature Image", featureImage);
    console.log("Logo Image", logoImage);
    console.log("Event Name", eventName);
    console.log("Short Description", shortDescription);
    console.log("Event Location", eventLocation);
    console.log("Event Date", eventDate);
    console.log("Deadline Date", deadlineDate);
    console.log("About Event", aboutEvent);
    console.log("Eligibility", eligibility);
    console.log("Schedule", schedule);
    console.log("Guidelines", guidelines);
    console.log("Prizes", prizes);
    console.log("Judging Criteria", judgingCriteria);
    console.log(orgDetails);

    // const orgShortName = orgDetails.shortname.replace(/[^\w\s]/gi, "").trim();
    // const eventDocRef = doc(db, "events", orgShortName, eventName.trim());

    const eventNameRef = eventName.replace(/[^\w\s]/gi, "").trim();

    const docRef = doc(
      db,
      "events",
      orgDetails.shortname.replace(/[^\w\s]/gi, "").trim(),
      user.uid,
      eventNameRef
    );

    setDoc(docRef, {
      eventName,
      shortDescription,
      eventLocation,
      eventDate,
      deadlineDate,
      aboutEvent,
      eligibility,
      schedule,
      guidelines,
      prizes,
      judgingCriteria,
    }).then(() => {
      //   console.log();
      console.log("Created the event");
      toast.success("Event is Created.");
      router.push("/dashboard/events");
    });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-7xl w-full mt-10">
        <div className="flex justify-center items-center mb-8 text-4xl font-bold tracking-wide">
          <h1>Create Event</h1>
        </div>

        <div className="border-2 border-black/80 rounded flex flex-col py-4 h-[300px] justify-center items-center">
          <label htmlFor="featured_image" className="text-xl">
            Featured Image
          </label>
          <span>{featureImage?.name}</span>
          <br />
          {/* <input type="file" id="featured_image" /> */}
          <input
            type="file"
            onChange={(e) => setFeatureImage(e.target.files[0])}
            accept="image/png"
            id="featured_image"
            className="hidden"
          />
        </div>

        <hr className="mt-8 mb-8" />

        <div className="flex w-full gap-8">
          <div className="w-[40%] border-2 border-black/80 rounded flex flex-col justify-center items-center">
            <label htmlFor="logo_image" className="text-xl font-bold">
              Add Logo
            </label>
            <span>{logoImage?.name}</span>
            <input
              type="file"
              onChange={(e) => setLogoImage(e.target.files[0])}
              accept="image/png"
              id="logo_image"
              className="hidden"
            />
          </div>
          <div className="w-[60%] flex flex-col gap-6">
            <input
              type="text"
              placeholder="Event Name ..."
              className="border-black/80 rounded border-2 px-6 py-2"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Short Description ..."
              maxLength={60}
              className="border-black/80 rounded border-2 px-6 py-2"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Event Location ..."
              maxLength={150}
              className="border-black/80 rounded border-2 px-6 py-2"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
            />
            <div className="flex flex-col w-full">
              <label htmlFor="event_date" className="text-l mb-2 text-black/90">
                Event Date
              </label>
              <input
                type="date"
                placeholder="Event Date"
                min={new Date().toISOString().split("T")[0]}
                className="border-black/80 rounded border-2 px-6 py-2"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="event_date" className="text-l mb-2 text-black/90">
                Deadline Date
              </label>
              <input
                type="date"
                placeholder="Deadline Date"
                min={new Date().toISOString().split("T")[0]}
                className="border-black/80 rounded border-2 px-6 py-2"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <hr className="mt-8 mb-8" />

        <div className="p-0 m-0 border-2 border-black/80 rounded">
          <textarea
            placeholder="About Event ..."
            className="px-10 py-4 w-full resize-none"
            rows={12}
            value={aboutEvent}
            onChange={(e) => setAboutEvent(e.target.value)}
          ></textarea>
        </div>

        <hr className="mt-8 mb-8" />

        <div>
          <h1 className="text-xl font-bold tracking-wide mb-4">Eligibility</h1>
          <div>
            <ul className="ml-6">
              {eligibility.length === 0 && (
                <li className="border-2 border-black/90 px-4 py-2 rounded mb-2">
                  No Eligibility
                </li>
              )}
              {eligibility.map((item, index) => (
                <li
                  key={index}
                  className="border-2 border-black/90 px-4 py-2 rounded mb-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              onClick={(e) => handleEligibility(e)}
              className="flex justify-center items-center px-6 py-2 bg-black/90 text-white rounded gap-4 text-xl"
            >
              Add <FaRegPlusSquare />
            </button>
          </div>
        </div>

        <hr className="mt-8 mb-8" />

        <div>
          <h1 className="text-xl font-bold tracking-wide mb-4">Schedule</h1>
          <div>
            <ul className="ml-6">
              {schedule.length === 0 && (
                <li className="border-2 border-black/90 px-4 py-2 rounded mb-2">
                  No Schedule
                </li>
              )}
              {schedule.map((item, index) => (
                <li
                  key={index}
                  className="border-2 border-black/90 px-4 py-2 rounded mb-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              onClick={(e) => handleSchedule(e)}
              className="flex justify-center items-center px-6 py-2 bg-black/90 text-white rounded gap-4 text-xl"
            >
              Add <FaRegPlusSquare />
            </button>
          </div>
        </div>

        <hr className="mt-8 mb-8" />

        <div>
          <h1 className="text-xl font-bold tracking-wide mb-4">Guidlines</h1>
          <div>
            <ul className="ml-6">
              {guidelines.length === 0 && (
                <li className="border-2 border-black/90 px-4 py-2 rounded mb-2">
                  No Guidelines
                </li>
              )}
              {guidelines.map((item, index) => (
                <li
                  key={index}
                  className="border-2 border-black/90 px-4 py-2 rounded mb-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              onClick={(e) => handleGuidelines(e)}
              className="flex justify-center items-center px-6 py-2 bg-black/90 text-white rounded gap-4 text-xl"
            >
              Add <FaRegPlusSquare />
            </button>
          </div>
        </div>

        <hr className="mt-8 mb-8" />

        <div>
          <h1 className="text-xl font-bold tracking-wide mb-4">Prizes</h1>
          <div>
            <ul className="ml-6">
              {prizes.length === 0 && (
                <li className="border-2 border-black/90 px-4 py-2 rounded mb-2">
                  No Prizes
                </li>
              )}
              {prizes.map((item, index) => (
                <li
                  key={index}
                  className="border-2 border-black/90 px-4 py-2 rounded mb-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              onClick={(e) => handlePrizes(e)}
              className="flex justify-center items-center px-6 py-2 bg-black/90 text-white rounded gap-4 text-xl"
            >
              Add <FaRegPlusSquare />
            </button>
          </div>
        </div>

        <hr className="mt-8 mb-8" />

        <div>
          <h1 className="text-xl font-bold tracking-wide mb-4">
            Judging Criteria
          </h1>
          <div className="p-0 m-0 border-2 border-black/80 rounded ml-6 mb-6">
            <textarea
              placeholder="Judging Criteria ..."
              className="px-10 py-4 w-full resize-none"
              rows={8}
              value={judgingCriteria.text}
              onChange={(e) =>
                setJudgingCriteria({ ...judgingCriteria, text: e.target.value })
              }
            ></textarea>
          </div>

          <h1 className="text-xl font-bold tracking-wide mb-4">List</h1>
          <div>
            <ul className="ml-6">
              {judgingCriteria.list.length === 0 && (
                <li className="border-2 border-black/90 px-4 py-2 rounded mb-2">
                  No Judging Criteria
                </li>
              )}
              {judgingCriteria.list.map((item, index) => (
                <li
                  key={index}
                  className="border-2 border-black/90 px-4 py-2 rounded mb-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              onClick={(e) => handleJudgingCriteria(e)}
              className="flex justify-center items-center px-6 py-2 bg-black/90 text-white rounded gap-4 text-xl"
            >
              Add <FaRegPlusSquare />
            </button>
          </div>
        </div>

        <div className="mt-12">
          <button
            onClick={handleCreateEvent}
            className="w-full rounded bg-black/90 text-white hover:bg-black/80 py-4 text-xl"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCreate;
