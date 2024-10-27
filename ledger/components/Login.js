"use client";

import { Encrypt } from "@/helper/Cypher";
import Logger from "@/helper/Request";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import "@/app/app.css";
import { FaQuoteLeft, FaQuoteRight, FaUserAstronaut } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

export default function LoginPage() {
  const [passvisibility, setVisibility] = useState(false);
  const [name, setname] = useState("");
  const [pass, setpass] = useState("");
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      const err = setTimeout(() => {
        setError("");
      }, 2500);
      return () => clearTimeout(err);
    }
  }, [error]);

  const LoginUser = async () => {
    try {
      setloading(true);
      if (!name || !pass) {
        setError("Fill all fields");
        return;
      }
      const res = await Logger(name, pass);
      const js = JSON.stringify(res.data);
      const data = Encrypt(js);
      localStorage.setItem("logger", data);
      if (!res || !res.message) {
        setError("Login failed, try again!");
        return;
      }
      router.push("/Home");
    } catch (err) {
      setError("Error occurred during login");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row font">
      {error && (
        <div className="absolute top-0 left-0 bg-red-600 text-white p-3 m-5 rounded-sm border border-r-red-400 border-r-8 z-10">
          {error}
        </div>
      )}
      <div className="flex flex-col justify-center text-black w-full sm:w-3/5 p-8">
        <h1 className="hidden lg:block text-5xl font-black">
          <Typewriter
            words={[
              "Welcome to our conference!",
              "Join us for insightful sessions!",
              "Sri Sairam College of Engineering.",
              "Department of CSE 🎉.",
            ]}
            loop={5}
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delay={1000}
          />
        </h1>
        <h1 className="block text-center lg:hidden text-3xl font-black">
          Sri Sairam College of Engineering
        </h1>
        <p className="mt-7 w-full sm:w-2/3 text-center lg:text-left xl:text-left">
          <FaQuoteLeft className="inline text-black" />
          <span className="ml-2">
            This application is designed exclusively for our team to efficiently
            register students from various colleges for our upcoming conference.
          </span>
          <FaQuoteRight className="inline ml-2 text-black" />
        </p>
      </div>

      <div className="bg-gray-100 h-full md:h-screen lg:h-screen xl:h-screen flex flex-col justify-center items-center p-8 w-full sm:w-2/5 relative">
        <div className="flex flex-col space-y-4 mt-16">
          <label className="text-black" htmlFor="username">
            Username
          </label>
          <div className="text-black bg-black flex items-center rounded border w-80 border-black">
            <input
              className="text-white bg-black border-gray-300 p-3 border-none outline-none rounded-lg focus:outline-none w-full focus:border-black"
              id="username"
              type="text"
              onChange={(e) => setname(e.target.value)}
            />
            <FaUserAstronaut className="text-white m-2" size={25} />
          </div>
          <label className="text-black" htmlFor="password">
            Password
          </label>
          <div className="text-black bg-black flex items-center rounded border w-80 border-black">
            <input
              className="text-white bg-black border-gray-300 p-3 border-none outline-none rounded-lg focus:outline-none w-full focus:border-black"
              id="password"
              type={passvisibility ? "text" : "password"}
              onChange={(e) => setpass(e.target.value)}
            />
            <div
              className="text-white m-2 cursor-pointer"
              onClick={() => setVisibility(!passvisibility)}
            >
              {passvisibility ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
              )}
            </div>
          </div>
        </div>
        <button
          className="bg-black w-80 p-4 text-md text-white mt-10 flex justify-center items-center py-3 rounded-lg hover:bg-gray-800 transition-all"
          onClick={LoginUser}
        >
          {loading ? (
            <AiOutlineLoading3Quarters
              className="text-4xl text-white animate-spin"
              size={20}
            />
          ) : (
            "Authenticate me"
          )}
        </button>
      </div>
    </div>
  );
}
