var assert = require('assert');
var { app } = require('../app')

const sample_incoming_data = {
    "Name": "Test", 
    "MQTT Topic": "test_topic", 
    "type": "Sonoff Basic"
}

describe('SonoffService', function() {
    describe('format_data()', function() {
        it('should format the data correctly', function() {
            let sample_data = {
                type: "Sonoff Basic",
                name: "Test",
                topic: "test_topic",
                state: {
                    power: false
                },
                protocol: "mqtt"
            }

            let output = app.get("SonoffService").format_data(sample_incoming_data)
            assert.deepStrictEqual(sample_data, output)
        })
    })
})

describe('SonoffService', () => {
    describe('save_new_device()', () => {
        context('with valid data', () => {
            it('should save correctly', () => {
                app.get("SonoffService").save_new_device(sample_incoming_data).then((ret) => {
                    assert.strictEqual("success", ret.status)
                })
                //TODO: should clean up database entry afterwards
            })
        })
        
    })
})