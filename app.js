const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const port = process.env.PORT || 3000
const app = express()
const server = require('http').createServer(app)
// const io = new (require('./utils/socket'))(server)

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
// app.use((req, res, next) => { next() })

app.use('/', routes)
// io.start()

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
