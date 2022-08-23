import User from "../../../models/User";
import connectMongo from "../../../utils/connectMongoDb";
export default async function handler(req, res) {
  try {
    if (req.method == "GET") {
      connectMongo();
      const expediteurs = await User.find({
        role: "expediteur",
        approved: false,
      }).select("name email");
      res.status(200).json(expediteurs);
    }
  } catch (err) {
    console.log(err);
  }
}
