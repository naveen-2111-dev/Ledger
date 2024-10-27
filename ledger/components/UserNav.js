import { useRouter } from "next/navigation";
import "tailwindcss/tailwind.css";
import "@/app/app.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";

export default function UsersNav() {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  return (
    <div className="flex justify-between items-center p-3 text-black">
      <h1 className="text-xl font-bold">Registrants</h1>
      <div
        className="relative flex flex-col items-end cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center gap-3 transition-all duration-500">
          {hover && (
            <div>
              Back to home
            </div>
          )}
          <FaArrowAltCircleLeft
            size={20}
            onClick={() => router.push("/Home")}
          />
        </div>
      </div>
    </div>
  );
}
