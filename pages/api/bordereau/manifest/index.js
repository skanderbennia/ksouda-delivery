import Bordereau from "../../../../models/Bordereau";
import connectMongo from "../../../../utils/connectMongoDb";
export default async function (req, res) {
  connectMongo();
  try {
    if (req.method === "POST") {
      const { manifestId } = req.body;
      const bordereaus = await Bordereau.find({ manifestId });
      return res.send(bordereaus);
    }
  } catch (err) {
    console.log(err);
  }
}
