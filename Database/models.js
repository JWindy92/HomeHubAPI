const mongoose = require('mongoose')
const Schema = mongoose.Schema



const SupportedDeviceSchema = new Schema({
    device_type: String,
    protocol: String
})

const SupportedDeviceModel = mongoose.model("Supported_Devices", SupportedDeviceSchema, "SUPPORTED_DEVICES")

const collection_dict = {
    'SUPPORTED_DEVICES': SupportedDeviceModel
}

module.exports = {
    "Collections" : collection_dict,
    "SupportedDevice" : SupportedDeviceModel
}