import Bordereau from "../../../../models/Bordereau";
import connectMongo from "../../../../utils/connectMongoDb";
export default async function handler(req, res) {
  try {
    connectMongo();
    if (req.method === "POST") {
      const { userId } = req.body;
      const list = await Bordereau.find({
        etat: "En cours",
        manifestId: null,
        user:userId
      });

      res.status(200).json(list);
    }
  } catch (err) {
    console.log(err);
  }
}
