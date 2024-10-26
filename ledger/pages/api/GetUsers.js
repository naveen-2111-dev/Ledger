import ConnectDb from "@/helper/Connect";

export default async function GET(req, res) {
  try {
    const collection = await ConnectDb();
    const data = await collection.pCollection.find().toArray();
    if (!data) {
      return res.status(500).json({
        error: "failed to fetch users",
      });
    }
    return res.status(200).json({
      message: "fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "internal server error",
    });
  }
}
