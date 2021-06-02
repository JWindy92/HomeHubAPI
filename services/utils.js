// const { app } = require('../app')

let ServiceLookup = {
    "Sonoff Basic": "SonoffService",
    "Yeelight": "YeelightService"
}

//TODO: Look into a way to give this module access to app without passing as a parameter
function LoadService(app, device_type) {
    let lookup = ServiceLookup[device_type]
    let service = app.get(lookup)
    return service
}

module.exports = {
    "LoadService": LoadService
}
