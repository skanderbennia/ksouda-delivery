// connect mongo db
import { mongoose } from "mongoose";
const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB Connected..."));
};
export default connectDB;
