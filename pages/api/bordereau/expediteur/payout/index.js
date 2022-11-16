import Bordereau from "../../../../../models/Bordereau";
import User from "../../../../../models/User";
import connectDB from "../../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await connectDB();
    await User.findByIdAndUpdate(req.body.idExpediteur, { payout: true });
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
