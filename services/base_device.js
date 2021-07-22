const { Device } = require('../database/models')
const DB = require("../database/DB")

class BaseDeviceService {

    constructor(app) {
        this.model = Device
    }

    base_method() {
        return "Calling the base service"
    }

    format_data(data) {
        return data   
    }

    save_new_device(data) {
        data = this.format_data(data)

        let device = new this.model(data)
        return new Promise ((resolve, reject) => {
            DB.WRITE.create_device(device)
            .then((ret) => {
                resolve({
                    status: "success",
                    ...data
                })
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

module.exports =  {
    "BaseDeviceService" : BaseDeviceService,
}