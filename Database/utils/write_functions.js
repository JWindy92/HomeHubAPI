const Models = require('../models')

function create_device(device_obj) {
    let model = Models.Lookup[device_obj.type]
    let device = new model(device_obj)
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

module.exports = {
    "create_device": create_device
}