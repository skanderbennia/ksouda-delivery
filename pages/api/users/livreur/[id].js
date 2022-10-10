import auth from "../../../../middlewares/auth";
import User from "../../../../models/User";
import connectDB from "../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      auth(req, res);
      console.log(req.user);
      const livreur = await User.find({ _id: req.query.id, role: "livreur"});
      res.status(200).json(livreur);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
