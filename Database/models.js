const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SupportedDeviceSchema = new Schema({
    device_type: String,
    protocol: String
})

const SupportedDeviceModel = mongoose.model("Supported_Devices", SupportedDeviceSchema, "SUPPORTED_DEVICES")


const DeviceSchema = new Schema({
    type: String,
    name: String
})

const DeviceModel = mongoose.model("Device", DeviceSchema, "DEVICES")

const collection_dict = {
    'SUPPORTED_DEVICES': SupportedDeviceModel,
    'DEVICES': DeviceModel
}

module.exports = {
    "Collections" : collection_dict,
    "SupportedDevice" : SupportedDeviceModel,
    "Device" : DeviceModel
}