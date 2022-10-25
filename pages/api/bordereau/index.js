import Bordereau from "../../../models/Bordereau";
import connectMongo from "../../../utils/connectMongoDb";
export default async function handler(req, res) {
  try {
    connectMongo();
    if (req.method === "GET") {
      const list = await Bordereau.find({}).populate("user");

      res.status(200).json(list);
    } else if (req.method === "POST") {
      console.log(req.body);
      req.body.codebar = Math.floor(Math.random() * 1000000000);
      const object = Bordereau({ ...req.body });
      await object.save();
      res.status(201).json(object);
    }
  } catch (err) {
    console.log(err);
  }
}
