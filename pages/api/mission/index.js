import Mission from "../../../models/Mission";
import connectDB from "../../../utils/connectMongoDb";
import Bordereau from "../../../models/Bordereau";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    connectDB();
    if (req.method === "GET") {
      const list = await Mission.find({}).sort({ _id: -1 });
      const bordereaus = await Bordereau.find({}).sort({ _id: -1 });
      let listMission = [];
      list.forEach((elem1) => {
        let listBordereau = [];
        let ms = { ...elem1._doc, bordereauList: [] };
        bordereaus.forEach((elem2) => {
          if (elem2._doc.missionId.toString() == ms._id.toString()) {
            listBordereau.push(elem2);
          }
        });
        ms["bordereauList"] = listBordereau;
        listMission.push(ms);
      });
      console.log(
        "🚀 ~ file: index.js ~ line 25 ~ handler ~ listMission",
        listMission
      );
      res.status(200).json(listMission);
    } else if (req.method === "POST") {
      const { livreurId, bordereauList } = req.body;
      let bordereauListObjectId = bordereauList.map((elem) =>
        mongoose.Types.ObjectId(elem)
      );
      const mission = await Mission.create({ livreurId });
      await Bordereau.updateMany(
        {
          _id: {
            $in: [...bordereauListObjectId]
          },
          etat: "En cours"
        },
        { livreurID: livreurId, missionId: mission._id }
      );
      await Bordereau.updateMany(
        {
          _id: {
            $in: [...bordereauListObjectId]
          },
          etat: "RD"
        },
        { livreurID: livreurId, missionId: mission._id, etat: "En cours" }
      );
      res.send("send");
    } else if (req.method === "PATCH") {
      const mission = await Mission.find({ _id: req.body.id }).sort({
        _id: -1
      });
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
