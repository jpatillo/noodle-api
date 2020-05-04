var firebase    = require('./firebase-service');
var moment      = require('moment')
var mysql      = require('mysql');

const user = process.env.NOODLEMYSQLUSER
const db = process.env.NOODLEMYSQLDATABASE
const password = process.env.NOODLEMYSQLPASSWORD
const socket = process.env.NOODLEMYSQLSOCKET

var pool  = mysql.createPool({
    connectionLimit : 10,
   // socketPath  : socket,
   host         : '127.0.0.1',
    user        : user,
    password    : password,
    database    : db
  });



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

    var qString = `INSERT INTO telemetry (${keys}) VALUES (${values});`    

    pool.query(qString, function (error, results, fields) {
        if (error) throw error;
        //console.log('The solution is: ', results);
      });

    
}

exports.saveTelemetry = saveTelemetry;