class SonoffService {

    constructor(app) {
        this.mqtt = app.get("MqttService")
    }

    set_power(topic, state) {
        console.log("Setting power for " + topic)
        this.mqtt.publish(`/cmnd/${topic}/POWER`, state)
    }

    subscribe_to_device(base_topic) {
        this.mqtt.subscribe(`/tele/${base_topic}/STATE`)
        this.mqtt.subscribe(`/cmnd/${base_topic}/POWER`)
        this.mqtt.subscribe(`/stat/${base_topic}/RESULT`)
    }

}

module.exports =  {
    // "init": init,
    "SonoffService" : SonoffService
}

