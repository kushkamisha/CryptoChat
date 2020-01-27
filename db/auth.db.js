'use strict'

const logger = require('../logger')
const { query } = require('../utils/db')
const { generateKeys } = require('../blockchain/utils')

const checkUniqueness = email => new Promise((resolve, reject) =>
    query(`select * from "User" where "Email" = '${email}'`)
        .then(users => {
            if (users.length) resolve(false)
            resolve(true)
        })
        .catch(err => reject(err)))

const registerUser = (email, firstName, middleName, lastName, birthDate,
    description, pass) => 
    query(`
        insert into "User" (
            "Email", "FirstName", "MiddleName", "LastName",
            "BirthDate", "Description", "PasswordHash"
        ) values ($1, $2, $3, $4, $5, $6, $7) returning "UserId"`,
    [email, firstName, middleName, lastName, birthDate, description, pass])

const setUserKeywords = (keywords, userId) => new Promise((resolve, reject) => {
    const queries = []

    keywords.forEach(keyword =>
        queries.push(query(`
            insert into "UserKeyword" ("UserId", "UserKeyword")
            values ($1, $2)`,
        [userId, keyword])))

    Promise.all(queries)
        .then(() => resolve(userId))
        .catch(err => reject(err))
})

const createWallet = userId => new Promise((resolve, reject) => {
    const [address, prKey] = generateKeys()
    logger.debug({ address, prKey })

    query(`insert into "Wallet" ("UserId", "Address")
        values ('${userId}', '${address}')`)
        .then(() => resolve({ userId, prKey }))
        .catch(err => reject(err))
})

const login = email => query(`
    select * from "User" where "Email" = '${email}'`)

module.exports = {
    checkUniqueness,
    registerUser,
    setUserKeywords,
    createWallet,
    login,
}