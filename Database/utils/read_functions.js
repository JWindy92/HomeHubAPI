const Models = require('../models')

function get_collection(collection_name) {
    let model = Models.Lookup[collection_name]
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

// TODO: Finish
function get_device(model, id) {
    return new Promise((resolve, reject) => {
        model.findOne({_id: id}).then((ret) => {
            resolve(ret)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    "get_collection": get_collection,
    "get_devices": get_devices
}