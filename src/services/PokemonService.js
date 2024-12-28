const Pokemon = require("../models/PokemonModel");

const createManyPokemons = (pokemons) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingPokemons = await Pokemon.find({ name: { $in: pokemons.map(p => p.name) } }).select('name');

      const existingNames = existingPokemons.map(pokemon => pokemon.name);

      const newPokemons = pokemons.filter(pokemon => !existingNames.includes(pokemon.name));

      if (newPokemons.length === 0) {
        resolve({
          status: 'ERR',
          message: 'All provided Pokémon already exist.',
        });
        return;
      }

      await Pokemon.insertMany(newPokemons);

      resolve({
        status: 'OK',
        message: 'SUCCESS',
      });
    } catch (e) {
      reject({
        status: 'ERR',
        message: e.message,
      });
    }
  });
};

const getAllPokemons = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { limit = 10, page = 1, sort, type, isLegendary = null, minSpeed, maxSpeed, searchName } = query
      limit = Number(limit) || null;
      page = Number(page) || 0;

      let filterQuery = {};
      let sortCriteria = { createdAt: -1, updatedAt: -1 };

      // Filter by type
      if (type) {
        filterQuery.$or = [{ type1: type }, { type2: type }];
      }

      // Filter by legendary status
      if (isLegendary !== undefined) {
        filterQuery.legendary = isLegendary === 'true';
      }

      // Filter by speed range
      filterQuery.speed = { $gte: Number(minSpeed), $lte: Number(maxSpeed) };

      // Filter by search name (case-insensitive)
      if (searchName) {
        filterQuery.name = { $regex: searchName, $options: 'i' };
      }

      // Handle sorting
      if (sort && sort.length === 2) {
        const [direction, field] = sort;
        sortCriteria = { [field]: direction === 'asc' ? 1 : -1, ...sortCriteria };
      }

      // Calculate pagination
      const skip = (Number(page) - 1) * Number(limit);

      // Total count of Pokémons after applying filters
      const totalPokemon = await Pokemon.countDocuments(filterQuery);

      // Fetch filtered and sorted Pokémon data
      const pokemons = await Pokemon.find(filterQuery)
        .limit(Number(limit))
        .skip(skip)
        .sort(sortCriteria);

      resolve({
        status: 'OK',
        message: 'Success',
        data: pokemons,
        total: totalPokemon,
        pageCurrent: Number(page),
        totalPage: Math.ceil(totalPokemon / Number(limit)),
      });
    } catch (e) {
      reject({
        status: 'ERR',
        message: e.message,
      });
    }
  });
};

module.exports = {
  createManyPokemons,
  getAllPokemons
}