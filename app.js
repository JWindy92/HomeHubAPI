'use strict'
const express = require('express')
const sockets = require('socket.io')
const body_parser = require('body-parser')
const cors = require('cors')
const app = express()
const url = require('url')
const path = require('path')
const e = require('cors')
const DB = require('./public/scripts/DB')
const mqtt = require('./public/scripts/mqtt')()
const port = 3001

class SocketService {
    constructor(server) {
        this.io = sockets(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        })
        this.io.on('connection', socket => {
            console.log('user connected')
        })
    }

    emiter(event, body) {
        if (body) {
            this.io.emit(event,body);
        }
    }
}

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))
app.use(cors())

require('./public/routes')(app)
require('./endpoints/devices')(app)

app.get('/', (req, res) => {
    res.render('index')
})

const server = app.listen(port, () => {
    console.log(`API Listening at http://localhost:${port}`)
})

app.set("socketService", new SocketService(server))