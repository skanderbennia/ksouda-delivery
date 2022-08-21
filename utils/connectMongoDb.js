// connect mongo db
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB Connected..."));
};
export default connectDB;
