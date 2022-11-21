import auth from "../../../../middlewares/auth";
import Bordereau from "../../../../models/Bordereau";
import Mission from "../../../../models/Mission";
import connectDB from "../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      // auth(req, res);
      const list = await Mission.find({ livreurId: req.body.id }).sort({ _id: -1 });
      const bordereaus = await Bordereau.find({ livreurID: req.body.id }).sort({ _id: -1 });
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
      res.status(200).json(listMission);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
