import bcrypt from "bcrypt";

import User from "../../../models/User";
import dbConnect from "../../../utils/connectMongoDb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const { email, password, name } = req.body;
    const user = await User({ email, password, name });
    await user.save();
    res.send(user);
  } else {
    res.status(405).json({ msg: "Method not allowed" });
  }
}
