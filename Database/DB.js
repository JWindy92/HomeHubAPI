const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const assert = require('assert')
const f = require('util').format

const READ = require('./utils/read_functions')
const WRITE = require('./utils/write_functions')

// const Models = require('./models')

const DB_NAME = 'SmartHomeDB'
//! const USER = 'root'
//! const PASSW = 'admin'
const CONN_URL = `mongodb://localhost:27018/${DB_NAME}`

mongoose.connect(CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => {
      console.log("Successful Connection")
  }).catch(err => {
      console.log(err.message)
  }
)

const db = mongoose.connection

db.on("error", () => {
    console.log("Error from the database")
})

db.once("open", () => {
    console.log("Connected to SmartHomeDB")
})

module.exports = {
    "READ": READ,
    "WRITE": WRITE
}