

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const logger = require('../logger')

const hash = sha3 => new Promise((resolve, reject) =>
    bcrypt.hash(sha3, 13, (err, hash) => {
        if (err) reject(err)
        resolve(hash)
    }))

const verify = (sha3, hash) => new Promise((resolve, reject) => {
    bcrypt.compare(sha3, hash)
        .then(res => {
            logger.debug(`Bcrypt result: ${res}`)
            resolve(res)
        })
        .catch(err => reject(err))
})

const generateToken = (userId, expiresIn = config.jwt.expiresIn) =>
    new Promise((resolve, reject) =>
        jwt.sign({ userId }, config.jwt.key, { expiresIn }, (err, token) => {
            if (err) reject(err)
            logger.debug(`JWT token: ${token}`)
            resolve(token)
        }))

const verifyToken = token => new Promise((resolve, reject) =>
    jwt.verify(token, config.jwt.key, (err, decoded) => {
        if (err) reject(err)
        logger.debug({ decoded })
        resolve(decoded)
    }))

module.exports = {
    hash,
    verify,
    generateToken,
    verifyToken,
}
