import Bordereau from "../../../../models/Bordereau";
import Manifest from "../../../../models/Manifest";
import connectMongo from "../../../../utils/connectMongoDb";
export default async function handler(req, res) {
  try {
    connectMongo();
    if (req.method === "POST") {
      const { bordereauIds, userId } = req.body;
      const manifest = await Manifest.create({ expediteurId: userId });
      await Bordereau.updateMany(
        { _id: { $in: [...bordereauIds] } },
        { manifestId: manifest._id }
      );
      res.send("bordereau manifested");
    }
  } catch (err) {
    console.log(err);
  }
}
