const DB = require("../public/scripts/DB")
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
        console.log(req.body)
        res.json({"status": res.statusCode})
        
    })
    
    // Do I accept a type param and use that to determine which DB function to call?
    // Or do I change this route to /devices/dht_11 and create separate routes for each type of device?
    // Or is there a better way to generalize this?
    app.post('/devices', (req, res) => {
        if (!req.query.type) {
            res.json({
                'error': 'no device type specified'
            })
        } else if (!req.body.id) {
            res.json({
                'error': 'no device identifier specified'
            })
        } else {
            let promise = mysql_DB.update_dht11(req.body.id, req.body.temp, req.body.humid)
            promise.then((ret) => {
                app.get("socketService").emiter('update', req.body)
                res.json({
                    'result': 'success',
                    'status': res.statusCode,
                    'affectd rows': ret.affectedRows
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    })

}