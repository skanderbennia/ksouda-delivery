import bcrypt from "bcrypt";

import User from "../../../models/User";
import dbConnect from "../../../utils/connectMongoDb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const { email, password, name, tel } = req.body;
    const user = await User({ email, password, name, tel });
    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.send(user);
  } else {
    res.status(405).json({ msg: "Method not allowed" });
  }
}
