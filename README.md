# VisionLord

Show light manager.

## Development

### Requirements

* Install `go`

### Run HTTPS server

* Start a local HTTPS server: https://localhost:1337
* This is required in order to use native WebUSB

```
// If you have npm
npm start

// If you have go
go run main.go
```


## How does it work?

* USBManager gets connection to the Arduino
* DmxOutput can generate an array[512] out of all DmxDevices
* The data of DmxOutput is send to Arduino via ArduinoLeonardoETHDriver
* The ArduinoLeonardoETHDriver has a reference to the DMXPort
