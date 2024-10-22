"use client";

import Logger from "@/helper/Request";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

export default function LoginPage() {
  const [passvisibility, setVisibility] = useState(false);
  const [name, setname] = useState("");
  const [pass, setpass] = useState("");
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const LoginUser = async () => {
    try {
      console.log("clicked");
      setloading(!loading);
      const res = await Logger(name, pass);
      if (!res || !res.message) {
        alert("Failed to login");
        return;
      }
      router.push("/Home");
    } catch (err) {
      console.log(err);
      alert("An error occurred during login.");
    } finally {
      setloading(loading);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-black">Login</h1>
        </div>
        <div className="flex flex-col space-y-4">
          <input
            className="border text-black border-gray-300 p-3 rounded-lg focus:outline-none focus:border-black"
            placeholder="UserName"
            type="text"
            onChange={(e) => setname(e.target.value)}
          />
          <div className="flex items-center gap-5 justify-center">
            <input
              className="border text-black border-gray-300 p-3 w-96 rounded-lg focus:outline-none focus:border-black"
              placeholder="@$%*&_!"
              type={passvisibility ? "text" : "password"}
              onChange={(e) => setpass(e.target.value)}
            />
            <div
              className="bg-black p-3 rounded-md"
              onClick={() => setVisibility(!passvisibility)}
            >
              {passvisibility ? (
                <AiOutlineEye size={25} />
              ) : (
                <AiOutlineEyeInvisible size={25} />
              )}
            </div>
          </div>
        </div>
        <button
          className="bg-black text-white mt-6 w-full flex justify-center py-3 rounded-lg hover:bg-gray-800 transition-all"
          onClick={LoginUser}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="text-4xl text-white animate-spin" size={20}/>
          ) : (
            "Authendicate me"
          )}
        </button>
      </div>
    </div>
  );
}
