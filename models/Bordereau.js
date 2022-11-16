import { mongoose } from "mongoose";
const BordereauSchema = new mongoose.Schema({
  codebar: {
    type: String
  },
  indexElement: {
    type: Number
  },
  bonLivraison: {
    type: String
  },
  nomClient: {
    type: String
  },
  adresse: {
    type: String
  },
  telClient: {
    type: String
  },
  prix_unit: {
    type: Number
  },
  quantite: {
    type: Number
  },
  contenu: {
    type: String
  },
  montantTTC: {
    type: Number
  }, 
  remarque: {
    type: String
  },
  payout: {
    type: Boolean,
    default: false
  },
  etat: {
    type: String,
    enum: ["En cours", "Annule", "Livre", "Echange"],
    default: "En cours"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  livreurID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  missionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mission",
    default: null
  }
});

// if Model exist then return it
const Bordereau =
  mongoose.models.Bordereau || mongoose.model("Bordereau", BordereauSchema);
export default Bordereau;
