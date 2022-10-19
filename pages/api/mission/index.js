import Mission from "../../../models/Mission";
import connectDB from "../../../utils/connectMongoDb";

export default async function handler(req, res) {
  try {
  connectDB();
  if (req.method === "GET") {
    const list = await Mission.find({});

    res.status(200).json(list);

  } else if (req.method === "POST") {
    const { livreurId, bordereauList } = req.body;
    const mission = await Mission({ livreurId,bordereauList });

    await mission.save();
    res.send(mission);
  } else {
    res.status(405).json({ msg: "Method not allowed" });
  }
  }catch (err) {
    console.log(err);
  }
}
