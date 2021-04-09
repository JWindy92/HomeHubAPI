const { json } = require('body-parser')
const mqtt = require('mqtt')
const Devices = require('../devices/tasmota')
class MqttService {

    constructor() {
        this.client = mqtt.connect('mqtt://10.0.0.228:1883')

        this.client.on('message', (topic, message) => {
        let obj = {
            'topic': topic,
            'message': message.toString()
            }
        console.log(obj)
        })
    }

    publish(topic, msg) {
        console.log("here")
        msg = JSON.stringify(msg)
        this.client.publish(topic, msg)
    }

    subscribe(topic) {
        console.log("subscribing to " + topic)
        this.client.subscribe(topic, (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
}

module.exports =  {
    // "init": init,
    "MqttService" : MqttService
}

