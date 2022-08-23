import User from "../../../../models/User";
import connectDB from "../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  connectDB();
  if (req.method === "GET") {
    await User.findByIdAndUpdate(req.query.id, { approved: true });
    res.send("Expediteur est Approuver");
  }
}
