import Mission from "../../../models/Mission";
import connectDB from "../../../utils/connectMongoDb";
export default async function handler(req, res) {
  connectDB();
  if (req.method === "GET") {
    const mission = await Mission.create({ name: "mission 1" });
    res.send(mission);
  }
}
