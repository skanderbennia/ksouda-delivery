import mongoose from "mongoose";

const TagSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});
export default mongoose.models.Tags || mongoose.model("Tags", TagSchema);
