const mongoose = require("mongoose");

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
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// if Model exist then return it
const Bordereau =
  mongoose.models.Bordereau || mongoose.model("Bordereau", BordereauSchema);
export default Bordereau;
