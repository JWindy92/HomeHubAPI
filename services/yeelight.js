
class YeelightService {

    constructor(app) {
        this.mqtt = app.get("MqttService")
        this.topic = "yeelight/cmnd"
    }

    set_state(data) {
        console.log("here")
        this.mqtt.publish(this.topic, data)
    }

}

module.exports =  {
    "YeelightService" : YeelightService
}
