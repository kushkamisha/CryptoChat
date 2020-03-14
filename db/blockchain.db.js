

const { query } = require('../utils/db')

const getUserAddress = userId =>
    query('select "Address" from "Wallet" where "UserId" = $1', [userId])

const saveTransfer = (from, to, amount, tx) =>
    query(`
        insert into "Transaction" (
            "FromUserId",
            "ToUserId",
            "TransactionAmountWei",
            "TransactionStatus",
            "RawTransaction"
        ) values ($1, $2, $3, 'unpublished', $4)`, [from, to, amount, tx])

const lastUnpublishedTxAmountForChat = (from, to) =>
    query(`
        select "TransactionAmountWei" from "Transaction"
        where "FromUserId" = $1 and
              "ToUserId" = $2 and
              "TransactionStatus" = 'unpublished'
        order by "TransactionAmountWei" desc
        limit 1;`, [from, to])

module.exports = {
    getUserAddress,
    saveTransfer,
    lastUnpublishedTxAmountForChat,
}
