import Mission from "../../../models/Mission";
import connectDB from "../../../utils/connectMongoDb";
import Bordreau from "../../../models/Bordereau";

export default async function handler(req, res) {
  try {
    connectDB();
    if (req.method === "GET") {
      const list = await Mission.find({});

      res.status(200).json(list);
    } else if (req.method === "POST") {
      const { livreurId, bordereauList } = req.body;
      const mission = await Mission({ livreurId, bordereauList });
      for (const el of bordereauList) {
        const bordereau = await Bordreau.findOneAndUpdate(
          { _id: el._id },
          { $set: { livreurID: livreurId } }
        );
      }
      await mission.save();
      res.send(mission);
    } else if (req.method === "PATCH") {
      const mission = await Mission.find({ _id: req.body.id });
      res.status(200).json(mission);
    } else if (req.method === "PUT") {
      const mission = await Mission.findByIdAndUpdate(req.body.id, {
        etat: "Terminee"
      });
      res.status(200).json(mission);
    } else {
      res.status(405).json({ msg: "Method not allowed" });
    }
  } catch (err) {
    console.log(err);
  }
}
