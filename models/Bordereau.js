import { mongoose } from "mongoose";
const BordereauSchema = new mongoose.Schema({
  codebar: {
    type: String,
  },
  bonLivraison: {
    type: String,
  },
  nomClient: {
    type: String,
  },
  adresse: {
    type: String,
  },
  telClient: {
    type: String,
  },
  prix_unit: {
    type: Number,
  },
  quantite: {
    type: Number,
  },
  contenu: {
    type: String,
  },
  montantTTC: {
    type: Number,
  },
  etat: {
    type: String,
    enum: ["En cours", "Annulé", "Livré"],
    default: "En cours",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  livreurID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

// if Model exist then return it
const Bordereau =
  mongoose.models.Bordereau || mongoose.model("Bordereau", BordereauSchema);
export default Bordereau;
