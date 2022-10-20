import Tags from "../../../models/Tags";
import connectDB from "../../../utils/connectMongoDb";

export default async function handler(req, res) {
  connectDB();
  if (req.method == "POST") {
    console.log(req.body);
    await Tags.create({ value: req.body.tagValue.toLowerCase() });
    res.status(200).json({ msg: "tag is created !" });
  } else if (req.method == "GET") {
    const tags = await Tags.find({});
    res.status(200).send(tags);
  }
}
