const DB = require("../public/scripts/DB")
const Models = require("../Database/models")
// const mysql_DB = require("../public/scripts/mysql_DB")

module.exports = function(app) {

    // Returns a list of supported device types
    app.get('/devices/supported', (req, res) => {
        DB.get_collection("SUPPORTED_DEVICES").then((ret) => {
            res.json(ret)
        }).catch((err) => {
            console.log(err)
        })
    })
    
    // Returns entire list of devices of a certain type
    // TODO: Should handle no device type by returning all devices in DB
    app.get('/devices/', (req, res) => {
        if (req.query.type) {
            DB.get_devices(req.query.type).then((ret) => {
                res.json(ret)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            DB.get_devices().then((ret) => {
                res.json(ret)
            }).catch((err) => {
                console.log(err)
            })
        }
    })

    app.post('/add_device', (req, res) => {
        let model = Models.Collections[req.body.type]
        let device = new model(req.body)
        console.log("Attempting to save")
        device.save((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('success')
                res.json({
                    'result': 'success',
                    'status': res.statusCode,
                })
            }
        })
    })

}