
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const assert = require('assert')
const f = require('util').format

const Models = require('../../Database/models')

const DB_NAME = 'SmartHomeDB'
const USER = 'root'
const PASSW = 'admin'
const AUTHMECHANISM = 'DEFAULT'
const CONN_URL = `mongodb://localhost:27018/SmartHomeDB`

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

function get_collection(collection_name) {
    let model = Models.Collections[collection_name]
    return model.find({})
}

function get_devices(type="") {
    if (type) {
        let model = Models.Device
        return model.find({type: type})
    } else {
        let model = Models.Device
        return model.find({})
    }
}

module.exports = {
    "get_collection": get_collection,
    "get_devices": get_devices
}