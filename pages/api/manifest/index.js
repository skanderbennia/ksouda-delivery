import Manifest from "../../../models/Manifest";
import connectMongo from "../../../utils/connectMongoDb";
export default async function handler(req, res) {
  try {
    connectMongo();
    if (req.method === "POST") {
      const { userId } = req.body;
      const manifest = await Manifest.find({ expediteurId: userId }).sort({
        _id: -1
      });
      res.send(manifest);
    }
  } catch (err) {
    console.log(err);
  }
}
