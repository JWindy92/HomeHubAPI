const mysql = require('mysql')

const device_dict = {
    "Sonoff Basic": {
        "table": "Sonoff_Basic",
    }
}

const DB_CONFIG = {
    host: 'localhost',
    port: 3307,
    user: 'john',
    password: 'admin',
    database: 'SmartHomeDB'
}

const pool = mysql.createPool(DB_CONFIG)

function get_table(table_name) {
    let query = `SELECT * FROM ${table_name}`
    return new Promise((resolve, reject) => {
        pool.getConnection((err,conn) => {
            if (err) {
                reject(err)
            } else {
                conn.query(query, (err, result, fields) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            }
            conn.release()
        })
    })
}

function update_dht11(id, temp, hum) {
    let query = `UPDATE DHT_11 SET temp = ${temp}, humidity = ${hum} WHERE ID = "${id}"`
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err)
            } else {
                conn.query(query, (err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.stringify(result))
                        console.log("Affected Rows: " + result.affectedRows)
                    }
                })
            }
            conn.release()
        })
    })
}

function test_function() {
    console.log("Hello from the DB module!")
}

module.exports = {
    DB_CONFIG: DB_CONFIG,
    get_table: get_table,
    update_dht11: update_dht11,
    test_function: test_function
}