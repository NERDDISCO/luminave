# VisionLord

Show light manager.

* It works only in a browser that supports modules (>= Chrome 63)
* Enable experimental flags
  * chrome://flags/#enable-experimental-web-platform-features
  * chrome://flags/#enable-midi-manager-dynamic-instantiation
* WebUSB needs https as it's not behind a flag anymore starting with Chrome 63

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

### Send data to DMX512 interface

* USBManager gets connection to the Arduino
* DmxOutput can generate an array[512] out of all DmxDevices
* The data of DmxOutput is send to Arduino via ArduinoLeonardoETHDriver
* The ArduinoLeonardoETHDriver has a reference to the DMXPort
