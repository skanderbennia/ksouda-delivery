import Bordereau from "../../../models/Bordereau";
import User from "../../../models/User";
import connectMongo from "../../../utils/connectMongoDb";
export default async function handler(req, res) {
  try {
    connectMongo();
    if (req.method === "GET") {
      const list = await Bordereau.find({}).sort({ _id: -1 }).populate("user");

      res.status(200).json(list);
    } else if (req.method === "POST") {
      if (req.body.id && req.body.etat) {
        if (req.body.etat == "RD") {
          const findItem = await Bordereau.findById(req.body.id);

          if (findItem.retour_depot >= 2) {
            await Bordereau.findByIdAndUpdate(req.body.id, {
              etat: "Annule"
            });
          } else {
            const item = await Bordereau.findByIdAndUpdate(req.body.id, {
              etat: req.body.etat,
              $inc: { retour_depot: 1 }
            });
          }
        } else {
          const item = await Bordereau.findByIdAndUpdate(req.body.id, {
            etat: req.body.etat
          });
        }

        return res.send("Bordereau is updated");
      }
      let min = 10000000;
      let max = 99999999;
      req.body.codebar = Math.floor(Math.random() * (max - min + 1)) + min;
      await User.findByIdAndUpdate(req.body.user, { payout: false });
      const list = await Bordereau.find({}).sort({ _id: -1 });
      const object = Bordereau({ ...req.body, indexElement: list.length });
      await object.save();
      res.status(201).json(object);
    } else if (req.method === "PATCH") {
      await Bordereau.findByIdAndDelete(req.body.id);
      res.status(204).json({});
    }
  } catch (err) {
    console.log(err);
  }
}
