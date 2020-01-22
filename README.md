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
- Save telemetry to a database and allow it to be read from the Android app
- User accounts with access to specific devices.