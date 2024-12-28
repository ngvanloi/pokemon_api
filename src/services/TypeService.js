const Type = require("../models/TypeModel");

const createManyTypes = (types) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Find existing types in the database
      const existingTypes = await Type.find({ name: { $in: types } }).select('name');

      // Get the names of the existing types
      const existingNames = existingTypes.map(type => type.name);

      // Filter out types that already exist
      const newTypes = types.filter(type => !existingNames.includes(type));

      if (newTypes.length === 0) {
        resolve({
          status: 'ERR',
          message: 'All provided types already exist.',
        });
        return;
      }

      // Create new types using insertMany
      const createdTypes = await Type.insertMany(newTypes.map(type => ({ name: type })));

      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: createdTypes,
      });
    } catch (e) {
      reject({
        status: 'ERR',
        message: e.message,
      });
    }
  });
};

const getAllTypes = () => {
  return new Promise(async (resolve, reject) => {
      try {
        const allType = await Type.find().sort({createdAt: -1, updatedAt: -1})

          resolve({
              status: 'OK',
              message: 'Success',
              data: allType,
          })
      } catch (e) {
          reject(e)
      }
  })
}

module.exports = {
    createManyTypes,
    getAllTypes
}