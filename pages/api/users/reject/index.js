import User from "../../../../models/User";
import connectDB from "../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  connectDB();
  if (req.method === "POST") {
    const result = await User.findByIdAndUpdate(req.body.id, {
      approved: false
    });
    res.send("Expediteur est bloquee");
  }
}
