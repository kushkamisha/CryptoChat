

const express = require('express')
const { auth, blockchain } = require('./controllers')
const { verifyToken } = require('./middleware')

// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/register', auth.register)
router.get('/login',    auth.login)

router.get('/balanceInAddress',  verifyToken, blockchain.balanceInAddress)
router.get('/balanceInContract', verifyToken, blockchain.balanceInContract)
router.post('/signTransfer',      verifyToken, blockchain.signTransfer)
router.get('/verifyTranfer',     verifyToken, blockchain.verifyTransfer)
router.post('/publishTransfer',   verifyToken, blockchain.publishTransfer)

module.exports = router
