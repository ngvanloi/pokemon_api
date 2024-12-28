const express = require("express");
const router = express.Router()
const PokemonController = require('../controllers/PokemonController');

router.get('/', PokemonController.getAllPokemons)
router.post('/', PokemonController.createManyPokemons)

module.exports = router