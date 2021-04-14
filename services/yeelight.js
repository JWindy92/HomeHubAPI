
class YeelightService {

    constructor(app) {
        this.mqtt = app.get("MqttService")
        this.topic = "yeelight/cmnd"
    }

    set_state(data) {
        this.mqtt.publish(this.topic, data)
    }

}

module.exports =  {
    "YeelightService" : YeelightService
}
