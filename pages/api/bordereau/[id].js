import Bordereau from "../../../models/Bordereau";
import connectDB from "../../../utils/connectMongoDb";
export default async function handler(req, res) {
  // delete method
  if (req.method === "DELETE") {
    try {
      await connectDB();
      await Bordereau.findByIdAndDelete(req.query.id);
      res.status(204).json({});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}
