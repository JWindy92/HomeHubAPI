const mongoose = require('mongoose')
const { MqttService } = require('../mqtt/mqtt')
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
    topic: String,
    state: {
        power: Boolean,
    },
    protocol: String
})

const Sonoff_Basic_Model = mongoose.model("Sonoff Basic", Sonoff_Basic_Schema, "DEVICES")

const Yeelight_Schema = new Schema({
    type: String,
    name: String,
    addr: String,
    state: {
        power: Boolean,
    },
    protocol: String
})

const Yeelight_Model = mongoose.model("Yeelight", Yeelight_Schema, "DEVICES")

const lookup_dict = {
    'SUPPORTED_DEVICES': SupportedDeviceModel,
    'DEVICES': DeviceModel,
    'Sonoff Basic': Sonoff_Basic_Model,
    'Yeelight': Yeelight_Model,
}

module.exports = {
    "Lookup" : lookup_dict,
    "SupportedDevice" : SupportedDeviceModel,
    "Sonoff_Basic": Sonoff_Basic_Model,
    "Device" : DeviceModel,
    "Yeelight": Yeelight_Model
}