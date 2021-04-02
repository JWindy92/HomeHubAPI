const DB = require("../database/DB")
const Models = require("../database/models")

module.exports = (app) => {

    // Returns a list of supported device types
    app.get('/devices/supported', (req, res) => {
        DB.READ.get_collection("SUPPORTED_DEVICES").then((ret) => {
            res.json(ret)
        }).catch((err) => {
            console.log(err)
        })
    })
    
    // Returns entire list of devices of a certain type
    app.get('/devices/', (req, res) => {
        if (req.query.type) {
            DB.READ.get_devices(req.query.type).then((ret) => {
                res.json(ret)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            DB.READ.get_devices().then((ret) => {
                res.json(ret)
            }).catch((err) => {
                console.log(err)
            })
        }
    })

    app.post("/devices/", (req, res) => {
        if (req.query.id) {
            // app.get("MqttService").publish(`/cmnd/${req.body.topic}/POWER`, req.body.state)
            app.get("SonoffService").set_power(req.body.topic, req.body.state)
            DB.WRITE.update_device(req.body).then((ret) => {
                res.json(ret)
                app.get("socketService").emiter("update", ret)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            res.json({error: "No id specified"})
        }
    })

    app.post('/add_device', (req, res) => {
        DB.WRITE.create_device(req.body)
        .then((ret) => {
            res.json({
                'result': ret,
                'status': res.statusCode,
            })
        }).catch((err) => {
            console.log(err)
        })

    })
}