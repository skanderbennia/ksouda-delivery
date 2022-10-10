import User from "../../../../models/User";
import connectMongo from "../../../../utils/connectMongoDb";
export default async function handler(req, res) {
  try {
    if (req.method == "GET") {
      connectMongo();
      const livreur = await User.find({
        role: "livreur",
      }).select("name email approved");
      res.status(200).json(livreur);
    }
  } catch (err) {
    console.log(err);
  }
}
