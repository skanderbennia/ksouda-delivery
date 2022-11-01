import mongoose from "mongoose";

const MissionSchema = mongoose.Schema({
  livreurId: {
    type: String,
    required: true
  },
  bordereauList: {
    type: Array,
    default: []
  },
  etat: {
    type: String,
    enum: ["En cours", "Terminee"],
    default: "En cours"
  }
});
export default mongoose.models.Mission ||
  mongoose.model("Mission", MissionSchema);
