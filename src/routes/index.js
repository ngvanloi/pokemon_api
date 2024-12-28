const UserRouter = require('./UserRouter')
const TypeRouter = require('./TypeRouter')
const PokemonRouter = require('./PokemonRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/type', TypeRouter)
    app.use('/api/pokemon', PokemonRouter)
}

module.exports = routes