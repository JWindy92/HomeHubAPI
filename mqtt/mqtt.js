const mqtt = require('mqtt')
const Devices = require('../devices/tasmota')

const topics = ['hello', '/tele/toggle_light/STATE', '/stat/toggle_light/RESULT', '/stat/toggle_light/POWER', '/cmnd/toggle_light/POWER']

class MqttService {

    constructor() {
        this.client = mqtt.connect('mqtt://10.0.0.228:1883')
    }

    // TODO: need to finish a check to make sure the mqtt even was successful and wrap in a promise
    publish(topic, msg) {
        return new Promise((resolve, reject) => {
            this.client.publish(topic, msg)
        })
    }
}

function init() {

    const client = mqtt.connect('mqtt://10.0.0.228:1883')

    // let test_switch = new Devices.Tasmota_Sonoff_Basic('toggle_light', client)

    client.on('connect', () => {
        console.log('connected')
        // test_switch.set_power("OFF")
        topics.forEach((topic) => {
            console.log(`subscribing to ${topic}`)
            client.subscribe(topic, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })
    })

    client.on('message', (topic, message) => {
        let obj = {
            'topic': topic,
            'message': message.toString()
        }
        console.log(obj)
    })

}
module.exports =  {
    "init": init,
    "MqttService" : MqttService
}

