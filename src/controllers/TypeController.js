const TypeService = require('../services/TypeService')

const createManyTypes = async (req, res) => {
    try {
        const types = req.body.types
        if (!types) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await TypeService.createManyTypes(types)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
// const getDetailsType = async (req, res) => { }
const getAllTypes = async (req, res) => {
    try {
        const response = await TypeService.getAllTypes()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createManyTypes,
    // getDetailsType,
    getAllTypes,
}
