const mqtt      = require('mqtt');
var MQTTPattern = require("mqtt-pattern");
var firebase    = require('./firebase-service');
var moment      = require('moment')
var postgres    = required('./postgres')

const host = process.env.MQTTHOST
const client = process.env.NOODLEMQTTID
const username = process.env.NOODLEMQTTUSER
const password = process.env.NOODLEMQTTPASS

var mqttClient = mqtt.connect(host, {clientId:client, username:username, password:password});

const topic_prefix = "noodle/+/";


// Mqtt error calback
mqttClient.on('error', (err) => {
    console.log(err);
    mqttClient.end();
});

// Connection callback
mqttClient.on('connect', () => {
    console.log(`mqtt client connected`);
    
    // mqtt subscriptions
    mqttClient.subscribe(topic_prefix+'telemetry/#', {qos: 1}, function(err,granted){
        if(err) console.log("subscribe error ",err);
        if(granted) console.log("subscribe granted ",granted);
    });
});
    
// When a message arrives, console.log it
// NOTE message is a buffer, not a string or (json) object
mqttClient.on('message', function (topic, message) {
    console.log(message.toString());

    var telemetry = MQTTPattern.exec("noodle/+id/telemetry",topic);
    if(telemetry){
        //TODO: some kind of device validation
        
        // Update only
        //let docRef = firebase.firestore.collection("devices").doc(telemetry.id);

        /* Save to firebase
        let docRef = firebase.firestore.collection("telemetry").doc(telemetry.id).collection(moment().format('YYYYMM')).doc(moment().format('DD'))
        let timekey = moment().format('HHmm')
        //TODO: error checks
        var msg = JSON.parse(message.toString());
        var data = {}
        for(var c=0;c<msg.length;c++){
            data[msg[c].id] = {...msg[c],createdAt: firebase.adminFirestore.FieldValue.serverTimestamp()}
        }
        docRef.set({[timekey]:data},{ merge: true });
        */

        var msg = JSON.parse(message.toString());
        for(var c=0;c<msg.length;c++){
            postgres.saveTelemetry(msg[c])
        }

    }

});

mqttClient.on('close', () => {
    console.log(`mqtt client disconnected`);
});

mqttClient.on('offline', () => {
    console.log('mqtt client is offline')

    // Set a timer to reconnect
    reconnectTimer()
});


function reconnectTimer() {
    setTimeout(() => {
        if(mqttClient.connected) return //we are connected now, so do nothing
        if(!mqttClient.reconnecting){ //we are disconnected and not attempting to reconnect
            mqttClient.reconnect()//reconnect
        }
        reconnectTimer()// set a timer to try reconnecting regardless of reconnecting state
    }, 1500);
}

function publish(topic,message){
    mqttClient.publish(topic_prefix+topic,message);
    //console.log("publishing message: "+topic_prefix+topic);
}


exports.publish = publish;