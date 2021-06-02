const DB = require("../database/DB")
class YeelightService {

    constructor(app) {
        this.mqtt = app.get("MqttService")
        this.topic = "yeelight/cmnd"
    }

    save_new_device(data) {
        return new Promise ((resolve, reject) => {
            DB.WRITE.create_device(data)
            .then((ret) => {
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    handle_command(data) {

        console.log("Yeelight command")
        let promise = new Promise((resolve, reject) => {
            if (!data.hasOwnProperty("addr")) {
                reject("No IP Address provided")
            } else {
                try {
                    this.mqtt.publish(this.topic, data)
                    resolve(data)
                }
                catch {
                    reject("Something went wrong")
                }
            }
            
            
        })
        return promise
    }

    set_power(topic, state) {
        // state = Boolean((state == 'true'))  //* Removed because state now comes in as boolean
        this.mqtt.publish(`yeelight`, state)
    }

    set_state(data) {
        this.mqtt.publish(this.topic, data)
    }

}

module.exports =  {
    "YeelightService" : YeelightService
}
