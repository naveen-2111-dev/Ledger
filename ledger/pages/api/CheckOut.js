import ConnectDb from "@/helper/Connect";

export default async function POST(req, res) {
  try {
    const { email } = req.body;

    const collection = await ConnectDb();

    const stateAlredyChanged = await collection.pCollection.findOne({ email });
    if (stateAlredyChanged && stateAlredyChanged.check !== false) {
      const checkinStateModify = await collection.pCollection.updateOne(
        { email },
        {
          $set: { check: false },
        }
      );
      if (!checkinStateModify.modifiedCount === 0) {
        return res.status(500).json({
          message: "failed to modify data",
        });
      }
      return res.status(200).json({
        message: "modified successfully",
      });
    }
    return res.status(401).json({
      message: "check-in state alredy changed",
    });
  } catch (error) {
    console.log(error);
  }
}
