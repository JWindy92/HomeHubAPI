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
function get_device_by_id(id) {
    console.log(id)
    get_devices().then((ret) => {
        console.log(ret)
    })
}

module.exports = {
    "get_collection": get_collection,
    "get_devices": get_devices,
    "get_device_by_id": get_device_by_id
}