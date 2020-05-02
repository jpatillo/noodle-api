# Noodle Backend

The backend for the Noodle project directly handles communications from/to endpoint devices. Messages sent from devices are received by the backend and properly handled to store data and notify users.

## Technologies

- node.js
  - express
- firebase
- MQTT

## TODO

- Device registration as the only method of creating a device document in the database
- Find out the lifecycle of a MQTT client.
- Save logs to a database for debugging.
- User accounts with access to specific devices.

## Database

PostgreSQL - Mostly used for recording telemetry.
role: noodle

```SQL
CREATE TABLE devices (
  id SERIAL   PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT CURRENT_DATE,
  device_id   VARCHAR(15) NOT NULL UNIQUE
);
```

```SQL
CREATE TABLE telemetry (
  id SERIAL   PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT CURRENT_DATE,
  sensor_id   VARCHAR(15) NOT NULL,
  device_id   VARCHAR(15) NOT NULL,
  data1       VARCHAR(20),
  data2       VARCHAR(20),
  data3       VARCHAR(20),
  device_time TIMESTAMPTZ  
);
```
