import ConnectDb from "@/helper/Connect";
import { serialize } from "cookie";

export default async function POST(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Missing required user fields" });
    }

    const collection = await ConnectDb();
    let userData;
    const User = await collection.findOne({ username });
    userData = User;

    if (!User) {
      return res.status(500).json({ error: "user not found" });
    }

    if (password !== User.password) {
      return res.status(401).json({ error: "bad credentials" });
    }

    res.setHeader(
      "set-cookie",
      serialize("connected", "true", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    return res.status(200).json({ message: "login successfull", data: User });
  } catch (err) {
    throw new Error("error in logging in", err);
  }
}
