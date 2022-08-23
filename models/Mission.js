import mongoose from "mongoose";

const MissionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
export default mongoose.models.Mission ||
  mongoose.model("Mission", MissionSchema);
