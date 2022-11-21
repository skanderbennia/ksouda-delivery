import Bordereau from "../../../../../models/Bordereau";
import User from "../../../../../models/User";
import connectDB from "../../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await connectDB();
    await Bordereau.updateMany(
      { user: req.body.idExpediteur,etat:"Livre" },
      { payout: true }
    );
    const list =  await Bordereau.find({user: req.body.idExpediteur,etat:"En cours"})
      if(list.length >0){
        await User.findByIdAndUpdate(req.body.idExpediteur, { payout: false });
      }else{
        await User.findByIdAndUpdate(req.body.idExpediteur, { payout: true });
      }

    res.status(200).send("payout is done");
    try {
    } catch (err) {
      console.log(err);
    }
  }
}
