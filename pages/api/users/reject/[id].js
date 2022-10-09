import User from "../../../../models/User";
import connectDB from "../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  connectDB();
  if (req.method === "GET") {
    const result = await User.findByIdAndUpdate(req.query.id, { approved: false });
    res.send("Expediteur est bloquee");
    console.log(result);
  }
}
