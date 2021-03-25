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

const Sonoff_Basic_Schema = new Schema({
    type: String,
    name: String,
    topic: String
})

const Sonoff_Basic_Model = mongoose.model("Sonoff Basic", Sonoff_Basic_Schema, "DEVICES")

const collection_dict = {
    'SUPPORTED_DEVICES': SupportedDeviceModel,
    'DEVICES': DeviceModel,
    'Sonoff Basic': Sonoff_Basic_Model,
}

module.exports = {
    "Collections" : collection_dict,
    "SupportedDevice" : SupportedDeviceModel,
    "Sonoff_Basic": Sonoff_Basic_Model,
    "Device" : DeviceModel
}