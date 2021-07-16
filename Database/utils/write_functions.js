const { Mongoose } = require('mongoose')
const Models = require('../models')
const { LoadService } = require("../../services/utils")

// * Writes new device to the database
function create_device(device) {
    // TODO: Everything should be running from the service
    return new Promise((resolve, reject) => {
        device.save((err) => {
            if (err) {
                reject(err)
            } else {
                resolve("success")
            }
        }
    )})
}

// TODO: Move this function to read_functions and finish
function get_device(model, id) {
    return new Promise((resolve, reject) => {
        model.findOne({_id: id}).then((ret) => {
            resolve(ret)
        }).catch((err) => {
            reject(err)
        })
    })
}

function update_device(device_data) {
    return new Promise((resolve, reject) => {
        let model = Models.Lookup[device_data.type]
        model.findOne({_id: device_data._id}).then((doc) => {
            doc.state = device_data.state
            doc.save().then((ret) => {
                if (ret === doc) {
                    resolve(ret)
                } else {
                    reject("Something went wrong")
                }
            })
        }).catch((err) => {
            reject(err)
        })  
    })
}

module.exports = {
    "create_device": create_device,
    "update_device": update_device,
}