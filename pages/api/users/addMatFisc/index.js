import User from "../../../../models/User";
import connectDB from "../../../../utils/connectMongoDb";

export default async function handler(req, res) {
  connectDB();
  if (req.method === "POST") {
    await User.findByIdAndUpdate(req.body.id, { matriculeFiscal: req.body.matricule });
    res.send("Matricule Fiscale a été ajouté");
  }
}
