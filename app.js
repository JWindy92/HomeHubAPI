'use strict'
const express = require('express')
const mysql = require('mysql')
const sockets = require('socket.io')
const body_parser = require('body-parser')
const cors = require('cors')
const app = express()
const url = require('url')
const path = require('path')
const e = require('cors')
const DB = require("./public/scripts/DB.js")
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

console.log("Hello from the new branch")

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

// ################ DEPRECIATING BELOW THIS LINE ################# 

app.post("/test/save", (req, res) => {od
    console.log(req.body)

    new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err)
            } else {
                let query = `INSERT INTO ${req.body.type} (ID, name, temp, humidity) VALUES (UUID(), "${req.body.name}", "${req.body.temp}", "${req.body.humid}")`
                conn.query(query, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        console.log(result)
                        resolve({"result": "OK"})
                    }
                    conn.release()
                })
            }
        })
    }).then((ret) => {
        res.json(ret)
    }).catch((err) => {
        console.log(err)
    })
})

const server = app.listen(port, () => {
    console.log(`API Listening at http://localhost:${port}`)
})

app.set("socketService", new SocketService(server))