"use client";

import "tailwindcss/tailwind.css";
import "@/app/app.css";
import sairam from "@/public/image.png";
import Image from "next/image";
import { FaMailchimp, FaLockOpen, FaPrint } from "react-icons/fa";
import Qrcode from "@/components/Qrcode";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Confetti from "react-confetti";
import { Decode } from "@/helper/Cypher";

export default function FormData() {
  const [formData, setFormData] = useState({
    collegeName: "",
    event: "",
    teamName: "",
    teamLeaderMobile: "",
    checkin: "",
    extraField: "",
    teamLeader: "",
    teamMembers: "",
    teamLeaderEmail: "",
  });
  const [dataTransfer, setDataTransfer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const [confetti, setconfetti] = useState(false);
  const [logger, setlogger] = useState("");

  const Data = JSON.stringify(formData);

  const isValid = () => {
    for (let key in formData) {
      if (formData[key] === "") {
        seterror("fill all fields");
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (error) {
      const timout = setTimeout(() => {
        seterror("");
      }, 2500);
      return () => clearTimeout(timout);
    }
  }, [error, confetti]);

  useEffect(() => {
    const det = localStorage.getItem("logger");

    if (det) {
      try {
        const decrypt = Decode(det);
        const name = JSON.parse(decrypt);
        setlogger(name.username);
      } catch (error) {
        seterror("Failed to decrypt logger");
      }
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      setDataTransfer(!dataTransfer);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    const loc = localStorage.getItem("url");
    try {
      if (!isValid()) {
        return;
      }
      const res = await fetch("/api/Mailer", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: formData.teamLeaderEmail,
          source: loc,
        }),
      });
      if (!res.ok) {
        seterror("failed to send email");
      }
      setconfetti(!confetti);
      setTimeout(() => {
        setconfetti(false);
      }, 5000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(loading);
    }
  };

  return (
    <div className="m-10 p-6 bg-white shadow-md rounded-lg no-print">
      {confetti ? <Confetti initialVelocityY={30} /> : ""}
      <h1 className="text-2xl font-bold text-black">{logger}</h1>
      <p className="text-sm mt-2 mb-4 text-gray-600">
        You have been granted special access to authenticate users. Please use
        this opportunity wisely and responsibly.
      </p>
      <form className="mt-6 border rounded-md overflow-hidden">
        <div className="p-2 bg-gray-400 rounded-t-md flex items-center justify-between">
          <Image src={sairam} alt="sairam logo" height={50} />
          <h1 className="p-2 text-black capitalize text-lg font-semibold">
            sri sairam college of engineering
          </h1>
        </div>
        <div className="p-5 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="collegeName"
                className="mb-1 font-medium text-gray-800"
              >
                College Name
              </label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
              />

              <label
                htmlFor="event"
                className="mt-4 mb-1 font-medium text-gray-800"
              >
                Event
              </label>
              <select
                id="event"
                name="event"
                value={formData.event}
                onChange={handleChange}
                className="p-2 border bg-transparent text-gray-600 border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
              >
                <option value="">Select an event</option>
                <option value="paper">paper</option>
                <option value="pitch-a-thon">pitch-a-thon</option>
                <option value="vlogger">vlogger</option>
              </select>

              <label
                htmlFor="teamName"
                className="mt-4 mb-1 font-medium text-gray-800"
              >
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="teamLeaderMobile"
                className="mb-1 font-medium text-gray-800"
              >
                Team Leader Mobile
              </label>
              <input
                type="tel"
                id="teamLeaderMobile"
                name="teamLeaderMobile"
                value={formData.teamLeaderMobile}
                onChange={handleChange}
                className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
              />

              <label
                htmlFor="checkin"
                className="mt-4 mb-1 font-medium text-gray-800"
              >
                Check-in
              </label>
              <input
                type="text"
                id="checkin"
                name="checkin"
                value={formData.checkin}
                onChange={handleChange}
                className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
              />

              <label
                htmlFor="extraField"
                className="mt-4 mb-1 font-medium text-gray-800"
              >
                Extra Field
              </label>
              <input
                type="text"
                id="extraField"
                name="extraField"
                value={formData.extraField}
                onChange={handleChange}
                className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="teamLeader"
                className="mb-1 font-medium text-gray-800"
              >
                Team Leader
              </label>
              <input
                type="text"
                id="teamLeader"
                name="teamLeader"
                value={formData.teamLeader}
                onChange={handleChange}
                className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
              />

              <label className="mt-4 mb-1 font-medium text-gray-800">
                Team Members
              </label>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="member1"
                  name="teamMembers"
                  value="1"
                  checked={formData.teamMembers === "1"}
                  onChange={handleChange}
                  className="mr-1"
                />
                <label htmlFor="member1" className="text-gray-800">
                  1
                </label>

                <input
                  type="radio"
                  id="member2"
                  name="teamMembers"
                  value="2"
                  checked={formData.teamMembers === "2"}
                  onChange={handleChange}
                  className="mr-1"
                />
                <label htmlFor="member2" className="text-gray-800">
                  2
                </label>

                <input
                  type="radio"
                  id="member3"
                  name="teamMembers"
                  value="3"
                  checked={formData.teamMembers === "3"}
                  onChange={handleChange}
                  className="mr-1"
                />
                <label htmlFor="member3" className="text-gray-800">
                  3
                </label>
              </div>

              <label
                htmlFor="teamLeaderEmail"
                className="mt-4 mb-1 font-medium text-gray-800"
              >
                Team Leader Email
              </label>
              <input
                type="email"
                id="teamLeaderEmail"
                name="teamLeaderEmail"
                value={formData.teamLeaderEmail}
                onChange={handleChange}
                className="p-2 border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="p-6 flex items-start justify-between gap-5">
          <div id="qrCodeContainer">
            {dataTransfer ? <Qrcode text={Data} /> : ""}
          </div>
          <div>
            <div className="mt-2 flex gap-1">
              <button
                className="flex justify-center items-center gap-2 bg-gray-500 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
                onClick={HandleSubmit}
              >
                Auth <FaLockOpen />
              </button>
              <button
                className="flex justify-center items-center gap-2 bg-blue-500 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
                onClick={() => window.print()}
              >
                print <FaPrint />
              </button>
              <button
                className="flex justify-center w-20 items-center gap-2 bg-red-500 p-2 rounded-md text-white hover:scale-105 transition-all duration-300"
                onClick={sendEmail}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters
                    className="text-4xl text-white animate-spin"
                    size={20}
                  />
                ) : (
                  <>
                    email <FaMailchimp />
                  </>
                )}
              </button>
            </div>
            <div>
              <h1 className="text-red-700 font-mono text-sm mt-3">{error}</h1>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
