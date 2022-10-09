import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../models/User";
import connectMongo from "../../../utils/connectMongoDb";

// sign token method
const signToken = (user) => {
  return jwt.sign(
    {
      iss: "Delivery",
      sub: user._id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    process.env.JWT_SECRET
  );
};

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      connectMongo();
      const { email, password } = req.body;
      console.log(email, password);
      const user = await User.findOne({ email, approved: true });
      console.log(user);
      if (!user) {
        return res.status(400).json({ msg: "Wrong email or password" });
      }
      // verify password
      console.log(password, user.password);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Wrong email or password" });
      }
      // sign token
      const token = signToken(user);
      res.status(200).json({ token, role: user.role, id: user._id });
    } else {
      res.status(405).json({ msg: "Method not allowed" });
    }
  } catch (err) {
    console.log(err);
  }
}
