var firebase    = require('./firebase-service');
var moment      = require('moment')
const {Pool}    = require('pg')

const user = process.env.PGUSER
const db = process.env.PGDATABASE

const postgres = new Pool({
    host:       'localhost',
    user:       user,
    database:   db
})

/**
 * 
 * @param {*} data 
 */
function saveTelemetry(deviceId,data={}){
    //TODO validate data.sensor_id and data.device_id

    data['device_id'] = `\'${deviceId}\'`
    data['sensor_id'] = `\'${data['sensor_id']}\'`

    var keys = Object.keys(data).map(function(k){return k}).join(",");
    var values = Object.keys(data).map(function(k){return data[k]}).join(",");

    //console.log('telemetry keys: ',keys)
    //console.log('telemetry values: ',values)

    var qString = `INSERT INTO telemetry (${keys}) VALUES (${values})`

    console.log('query ',qString)
    


    postgres.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack)
        }
        client.query('SELECT NOW()', (err, result) => {
          release()
          if (err) {
            return console.error('Error executing query', err.stack)
          }
          console.log(result.rows)
        })
      })


    /*
    postgres.query(qString)
    .then(res => console.log('Inserted row',res))
    .catch(err => {
        console.log("Error on INSERT ",err)
        setImmediate(() => {
            throw err
        })
    }
    )
    */
}

exports.saveTelemetry = saveTelemetry;