import User from "../../../../models/User";
import connectDB from "../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  connectDB();
  if (req.method === "GET") {
    await User.findByIdAndDelete(req.query.id, { approve: false });
    res.send("Expediteur est Approuver");
  }
}
