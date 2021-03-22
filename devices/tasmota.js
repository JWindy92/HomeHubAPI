class Tasmota_Sonoff_Basic {

    constructor(topic, mqtt_client) {
        this.base_topic = topic
        this.client = mqtt_client
        this.telem_topic = `/tele/${topic}/STATE`
        this.cmnd_topic = `/cmnd/${topic}/POWER`
        this.telem_topic = `/stat/${topic}/RESULT`

    }

    set_power(message) {
        this.client.publish(this.cmnd_topic, message)
    }

}

module.exports = {
    Tasmota_Sonoff_Basic: Tasmota_Sonoff_Basic
}