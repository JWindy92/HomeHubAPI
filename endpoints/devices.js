const DB = require("../database/DB")
const Models = require("../database/models")
const { LoadService } = require("../services/utils")

function validate_command(data) {
    let promise = new Promise((resolve, reject) => {
        if (!data.device_type) {
            reject("No device type provided")
        }
        resolve(data)
    })
    return promise
}

module.exports = (app) => {

    // Returns a list of supported device types
    app.get('/supported', (req, res) => {
        DB.READ.get_collection("SUPPORTED_DEVICES").then((ret) => {
            res.json(ret)
        }).catch((err) => {
            console.log(err)
        })
    })
    
    // Returns entire list of devices
    // If "type" url query provided, will only return devices of that type
    app.get('/devices/', (req, res) => {
        if (req.query.type) {
            DB.READ.get_devices(req.query.type).then((ret) => {
                res.json(ret)
            }).catch((err) => {
                console.log(err)
            })
        } else if (req.query.id) {
            DB.READ.get_device_by_id(req.query.id).then((ret) => {
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


    app.post("/devices/command", (req, res) => {
        validate_command(req.body).then((data) => {
            let service = LoadService(app, data.device_type)
            if (!service) { res.json({"error": "Invalid device type"})}
            service.handle_command(data).then((response) => {
                res.json({
                    "status": "success",
                    "response": response
                })
            }).catch((err) => {
                res.json({"error": err})
            })
        }).catch((err) => {
            res.json({"error": err})
        })
    })

    //* Writes new device to database
    app.post('/devices/new', (req, res) => {
        let service = LoadService(app, req.body.type)
        service.save_new_device(req.body).then((data) => {
            res.status(201).send(data)
        })
    })
}