import ConnectDb from "@/helper/Connect";

export default async function POST(req, res) {
  try {
    const { collegename, teammembers, email, event, check, time } = req.body;

    if (!collegename || !teammembers || !email || !event) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const collection = await ConnectDb();

    const existingUser = await collection.pCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const AddUser = await collection.pCollection.insertOne({
      collegename,
      teammembers,
      email,
      event,
      check,
      time,
    });

    if (!AddUser.insertedId) {
      return res.status(500).json({
        message: "Adding data failed.",
      });
    }

    return res.status(200).json({
      message: "User added successfully.",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
}
