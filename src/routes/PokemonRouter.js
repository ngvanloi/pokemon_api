const express = require("express");
const router = express.Router()
const PokemonController = require('../controllers/PokemonController');

router.get('/', PokemonController.getAllPokemons)
router.get('/get-details/:id', PokemonController.getPokemonById)
router.get('/my-favorite', PokemonController.getAllMyFavoritePokemons)
router.post('/', PokemonController.createManyPokemons)
router.patch('/:id', PokemonController.updateFavoriteToPokemon)

module.exports = router