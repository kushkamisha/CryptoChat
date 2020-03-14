const express = require('express')
const { auth, blockchain, chat } = require('./controllers')
const { verifyAppToken } = require('./middleware')

// eslint-disable-next-line new-cap
const r = express.Router()

r.post('/auth/register',       auth.register)
r.post('/auth/updateUserData', verifyAppToken, auth.updateUserData)
r.post('/auth/login',          auth.login)

r.get('/chat/chatList',        verifyAppToken, chat.chatsList)
r.get('/chat/messages',        verifyAppToken, chat.messages)
r.get('/chat/unreadMessages',  verifyAppToken, chat.unreadMessages)
r.post('/chat/message',        verifyAppToken, chat.addMessage)
r.post('/chat/readMessages',   verifyAppToken, chat.readMessages)

r.get('/bc/balanceInAddress',  verifyAppToken, blockchain.balanceInAddress)
r.get('/bc/balanceInContract', verifyAppToken, blockchain.balanceInContract)
r.post('/bc/signTransfer',     verifyAppToken, blockchain.signTransfer)
r.post('/bc/signTransferByUserId', verifyAppToken,
    blockchain.signTransferByUserId)
r.get('/bc/verifyTranfer',     verifyAppToken, blockchain.verifyTransfer)
r.post('/bc/publishTransfer',  verifyAppToken, blockchain.publishTransfer)

module.exports = r
