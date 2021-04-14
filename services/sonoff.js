class SonoffService {

    constructor(app) {
        this.mqtt = app.get("MqttService")
    }

    set_power(topic, state) {
        state = Boolean((state == 'true'))
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

