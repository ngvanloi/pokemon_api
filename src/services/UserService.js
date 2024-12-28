const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { genneralAccessToken, getUserIdByAccessToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
            })

            const accessToken = await generateAccessToken({ id: createdUser.Id });

            if (createdUser) {
                const data = {
                    name: createdUser.name,
                    email: createdUser.email,
                    accessToken,
                    refreshToken
                };
        
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data,
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const accessToken = await genneralAccessToken({
                id: checkUser.id,
            })

            const data = {
                name: checkUser.name,
                email: checkUser.email,
                accessToken,
            };
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getCurrentUser = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userId = getUserIdByAccessToken(token);
            if (!userId) {
                resolve({
                    status: 'ERR',
                    message: 'Invalid or expired token',
                });
            }
    
            const userDetails = await User.findOne({ _id: userId });
            if (!userDetails) {
                resolve({
                    status: 'ERR',
                    message: 'User not found',
                });
            }
            const accessToken = await genneralAccessToken({ id: userId });
    
            const data = {
                name: userDetails.name,
                email: userDetails.email,
                accessToken,
            };
    
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data,
            })
        } catch (e) {
            reject(e)
        }
    })
};

module.exports = {
    createUser,
    loginUser,
    getDetailsUser,
    getCurrentUser
}