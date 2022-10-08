import auth from "../../../../middlewares/auth";
import Bordereau from "../../../../models/Bordereau";
import connectDB from "../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      auth(req, res);
      console.log(req.user);
      const bordereau = await Bordereau.find({ user: req.query.id });
      console.log(bordereau);
      res.status(200).json(bordereau);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
