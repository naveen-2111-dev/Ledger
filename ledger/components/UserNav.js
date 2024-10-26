import { useRouter } from "next/navigation";
import "tailwindcss/tailwind.css";
import "@/app/app.css";

export default function UsersNav() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-3 font text-black">
      <h1 className="text-xl font-bold">Active Users</h1>
    </div>
  );
}
