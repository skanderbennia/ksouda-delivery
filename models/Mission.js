import mongoose from "mongoose";

const MissionSchema = mongoose.Schema({
  livreurId: {
    type: String,
    required: true,
  },
  bordereauList: {
    type: Array,
    default: [],
  },
  
});
export default mongoose.models.Mission ||
  mongoose.model("Mission", MissionSchema);
