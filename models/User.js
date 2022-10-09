import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    default: "expediteur",
    enum: ["expediteur", "livreur", "admin"],
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

// if Model exist then return it
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
