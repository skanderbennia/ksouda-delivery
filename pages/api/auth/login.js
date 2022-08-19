import connectMongo from "../../../utils/connectMongoDb";
export default function handler(req, res) {
  if (req.method === "POST") {
    connectMongo();
    const { email, password } = req.body;
    res.send({ email, password });
  } else {
    res.status(405).json({ msg: "Method not allowed" });
  }
}
