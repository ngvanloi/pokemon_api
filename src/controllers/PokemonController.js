const PokemonService = require('../services/PokemonService')

const createManyPokemons = async (req, res) => {
    try {
        const pokemons = req.body.pokemons
        if (!pokemons) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await PokemonService.createManyPokemons(pokemons)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllPokemons = async (req, res) => {
    try {
        const response = await PokemonService.getAllPokemons(req.query)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}

const updateFavoriteToPokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const { isFavorite } = req.body;
        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await PokemonService.updateFavoriteToPokemon(id, isFavorite)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createManyPokemons,
    getAllPokemons,
    updateFavoriteToPokemon
}
