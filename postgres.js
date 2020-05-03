var firebase    = require('./firebase-service');
var moment      = require('moment')
const {Pool}    = require('pg')

const postgres = new Pool({
    user:       process.env.PGUSER,
    database:   process.env.PGDATABASE
})

/**
 * 
 * @param {*} data 
 */
function saveTelemetry(deviceId,data={}){
    //TODO validate data.sensor_id and data.device_id

    data['device_id'] = deviceId

    var keys = Object.keys(data).map(function(k){return k}).join(",");
    var values = Object.keys(data).map(function(k){return data[k]}).join(",");

    //console.log('telemetry keys: ',keys)
    //console.log('telemetry values: ',values)

    var qString = `INSERT INTO telemetry (${keys}) VALUES (${values})`

    console.log('query ',qString)
    
    postgres.query(qString)
    .then(res => console.log('Inserted row',res))
    .catch(err => {
        console.log("Error on INSERT ",err)
        setImmediate(() => {
            throw err
        })
    }
    )
    
}

exports.saveTelemetry = saveTelemetry;