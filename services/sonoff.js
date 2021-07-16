const { Model } = require('mongoose')
const DB = require("../database/DB")
const { Sonoff_Basic } = require('../database/models')
class SonoffService {

    constructor(app) {
        this.mqtt = app.get("MqttService")
    }

    save_new_device(data) {

        data = {
            type: data.type,
            name: data.Name,
            topic: data['MQTT Topic'],
            state: {
                power: false
            },
            protocol: 'mqtt'
        }
        console.log(data)
        let device = new Sonoff_Basic(data)
        return new Promise ((resolve, reject) => {
            DB.WRITE.create_device(device)
            .then((ret) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    handle_command(data) {
        return new Promise ((resolve, reject) => {
            if (!data.topic) {
                reject("No topic provided")
            } else if (!data.state.hasOwnProperty("power")) {
                reject("No power value provided")
            } else {
                try {
                    this.set_power(data.topic, data.state.power)
                    resolve(data)
                }
                catch {
                    reject("Something went wrong")
                }
            }
        })
    }

    set_power(topic, state) {
        // state = Boolean((state == 'true'))  //* Removed because state now comes in as boolean
        this.mqtt.publish(`/cmnd/${topic}/POWER`, state)
    }

    subscribe_to_device(base_topic) {
        this.mqtt.subscribe(`/tele/${base_topic}/STATE`)
        this.mqtt.subscribe(`/cmnd/${base_topic}/POWER`)
        this.mqtt.subscribe(`/stat/${base_topic}/RESULT`)
    }

}

module.exports =  {
    "SonoffService" : SonoffService
}

