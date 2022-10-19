import User from "../../../../models/User";
import connectMongo from "../../../../utils/connectMongoDb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    connectMongo();
    if (req.method == "GET") {
      const livreur = await User.find({
        role: "livreur",
      }).select("name email approved");
      res.status(200).json(livreur);
    }
    else if (req.method === "POST") {
      const { email, password, name,tel } = req.body;
      const user = await User({ email, password, name, tel , role:"livreur" });
      // hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
      res.send(user);
    } else {
      res.status(405).json({ msg: "Method not allowed" });
    }
  } catch (err) {
    console.log(err);
  }
  
}
