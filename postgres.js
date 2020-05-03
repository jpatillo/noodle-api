var firebase    = require('./firebase-service');
var moment      = require('moment')
const {Pool}    = require('pg')

const postgres = new Pool()

/**
 * 
 * @param {*} data 
 */
function saveTelemetry(deviceId,data={}){
    //TODO validate data.sensor_id and data.device_id

    data['device_id'] = deviceId

    var keys = Object.keys(data).map(function(k){return k}).join(",");
    var values = Object.keys(data).map(function(k){return data[k]}).join(",");

    console.log('telemetry keys: ',keys)
    console.log('telemetry values: ',values)

    
    postgres.query(`INSERT INTO telemetry (${keys}) VALUES (${values})`)
    .then(res => console.log('Inserted row',res))
    .catch(err =>
        setImmediate(() => {
            throw err
        })
    )
    
}

exports.saveTelemetry = saveTelemetry;