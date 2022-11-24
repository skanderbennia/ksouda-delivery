import mongoose from "mongoose";

const ManifestSchema = mongoose.Schema({
  expediteurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});
export default mongoose.models.Manifest ||
  mongoose.model("Manifest", ManifestSchema);
