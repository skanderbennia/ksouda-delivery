import auth from "../../../../middlewares/auth";
import Bordereau from "../../../../models/Bordereau";
import connectDB from "../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      auth(req, res);
      const bordereau = await Bordereau.find({ user: req.body.id }).sort({ _id: -1 });
      res.status(200).json(bordereau);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
  if (req.method === "PUT") {
    await connectDB();
    await Bordereau.updateMany(
      { user: req.body.idExpediteur },
      { payout: true }
    );

    res.status(200).send("payout is done");
    try {
    } catch (err) {
      console.log(err);
    }
  }
}
