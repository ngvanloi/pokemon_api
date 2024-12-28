const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type1: { type: String, required: true },
    type2: { type: String },
    total: { type: Number, required: true },
    hp: { type: Number, required: true },
    attack: { type: Number },
    defense: { type: Number },
    defense: { type: Number },
    spAttack: { type: Number },
    spDefense: { type: Number },
    speed: { type: Number },
    generation: { type: Number },
    legendary: { type: Boolean },
    image: { type: String, required: true },
    ytbUrl: { type: String },
    isFavorite: { type: Boolean }
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Pokemon', pokemonSchema);

module.exports = Product;
