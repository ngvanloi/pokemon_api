const UserRouter = require('./UserRouter')
const TypeRouter = require('./TypeRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/type', TypeRouter)
}

module.exports = routes