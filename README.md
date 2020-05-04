# Noodle Backend

The backend for the Noodle project directly handles communications from/to endpoint devices. Messages sent from devices are received by the backend and properly handled to store data and notify users.

## Technologies

- node.js
  - express
- firebase
- MQTT
- mySQL

## TODO

- Device registration as the only method of creating a device document in the database
- Find out the lifecycle of a MQTT client.
- Save logs to a database for debugging.
- User accounts with access to specific devices.

## Database

mySQL - Mostly used for recording telemetry.

```SQL
CREATE TABLE devices (
  id          INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  device_id   VARCHAR(15) NOT NULL UNIQUE
) AUTO_INCREMENT = 1;
```

TODO methodology for creating new telemetry tables periodically so the sizes don't get too unwieldy.

```SQL
CREATE TABLE noodle.telemetry (
  id          INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sensor_id   VARCHAR(15) NOT NULL,
  device_id   VARCHAR(15) NOT NULL,
  active      BOOLEAN,
  temperature NUMERIC(6,3),
  humidity    NUMERIC(7,3),
  device_time TIMESTAMP  
) AUTO_INCREMENT = 1;
```
