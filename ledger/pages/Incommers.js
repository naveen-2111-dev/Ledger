import UsersNav from "@/components/UserNav";
import CheckedIN from "@/helper/CheckedInUsers";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

export default function Registrants() {
  const [User, setUser] = useState([]);
  const [Icons, setIcons] = useState([]);

  useEffect(() => {
    const userIcons = [
      "FaUser",
      "FaUserCircle",
      "FaUserPlus",
      "FaUserMinus",
      "FaUserEdit",
      "FaUserFriends",
      "FaUserLock",
      "FaUserShield",
      "FaUserTie",
      "FaUsers",
      "FaUserAstronaut",
      "FaUserNinja",
      "FaUserSecret",
      "FaUserGraduate",
      "FaUserCheck",
      "FaUserCog",
      "FaUserClock",
      "FaUserAlt",
      "FaUserTimes",
      "FaUserAstronaut",
      "FaUserSecret",
      "FaUserNinja",
      "FaUserInjured",
      "FaUserMd",
      "FaUserRobot",
      "FaUserTie",
      "FaUserGraduate",
    ];

    const fetcher = async () => {
      const Users = await CheckedIN();
      if (Array.isArray(Users)) {
        setUser(Users);
        if (Icons.length === 0) {
          const assignedIcons = Users.map(() => {
            const random = Math.floor(Math.random() * userIcons.length);
            return FaIcons[userIcons[random]];
          });
          setIcons(assignedIcons);
        }
      } else {
        console.error("Expected an array but got:", Users);
      }
    };

    fetcher();
    const interval = setInterval(() => {
      fetcher();
    }, 1000);

    return () => clearInterval(interval);
  }, [Icons]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <UsersNav />
      </div>
      <div className="flex flex-wrap justify-center p-6 gap-6">
        {User.length > 0 ? (
          User.map((user, index) => {
            const RandomIcon = Icons[index];
            return (
              <div
                key={index}
                className="relative flex flex-col items-center w-full max-w-xs p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`absolute top-2 right-2 w-3 h-3 ${
                    user.check ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <div className="text-white bg-black p-5 rounded-full shadow-md mb-4">
                  {RandomIcon && <RandomIcon size={60} />}
                </div>
                <div className="flex flex-col items-center mb-2 text-center">
                  <h1 className="text-xl font-bold text-gray-800">
                    {user.collegename}
                  </h1>
                </div>
                <h2 className="text-md text-gray-600">{user.email}</h2>
                <div className="flex flex-col mt-4 text-center">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {user.eventName}
                  </h1>
                  <h2 className="text-md text-gray-600">{user.event}</h2>
                  <h3 className="text-md text-gray-600">{user.time}</h3>
                </div>
              </div>
            );
          })
        ) : (
          <p>
            <AiOutlineLoading3Quarters
              className="text-4xl text-black animate-spin"
              size={100}
            />
          </p>
        )}
      </div>
    </div>
  );
}
