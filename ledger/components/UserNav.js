import Checkout from "@/public/image copy 3.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "tailwindcss/tailwind.css";
import "@/app/app.css";

export default function UsersNav() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-3 font text-black">
      <h1 className="text-xl font-bold">Active Users</h1>
      <div>
        <Image
          src={Checkout}
          height={45}
          alt="Checkout Icon"
          onClick={() => router.push("/Checkouters")}
          className="hover:scale-105 transition-transform duration-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
