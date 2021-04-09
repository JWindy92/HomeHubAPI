const { Mongoose } = require('mongoose')
const Models = require('../models')

// * Writes new device to the database
function create_device(device_obj) {
    let model = Models.Lookup[device_obj.type]
    let device = new model(device_obj)
    console.log(device_obj)
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
        console.log(model)
        model.findOne({_id: device_data._id}).then((doc) => {
            doc.state = device_data.state
            doc.save().then((ret) => {
                if (ret === doc) {
                    console.log("UPDATED")
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