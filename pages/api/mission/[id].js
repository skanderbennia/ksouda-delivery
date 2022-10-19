import auth from "../../../middlewares/auth";
import Mission from "../../../models/Mission";
import connectDB from "../../../utils/connectMongoDb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      auth(req, res);
      const mission = await Mission.find({ _id: req.query.id});
      res.status(200).json(mission);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
