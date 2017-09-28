# VisionLord

Show light manager for DMX512 shows.

[![polymer 3](https://img.shields.io/badge/polymer-3.0_preview-f50057.svg?style=flat)](https://www.polymer-project.org/blog/2017-08-22-npm-modules)
[![ES6 modules](https://img.shields.io/badge/ES6-modules-44aa44.svg?style=flat)](https://www.polymer-project.org/blog/2017-08-22-npm-modules)

[![WebUSB](https://img.shields.io/badge/API-WebUSB-1e88e5.svg?style=flat)](https://wicg.github.io/webusb/)
[![WebMIDI](https://img.shields.io/badge/API-WebMIDI-1e88e5.svg?style=flat)](https://webaudio.github.io/web-midi-api/)


* Only works in a browser that supports ES6 modules & WebUSB (>= Chrome 63)
* In order to use WebUSB (even on localhost), you need a https server

## Requirements

### Chrome
* Enable experimental flags
  * chrome://flags/#enable-experimental-web-platform-features
  * chrome://flags/#enable-midi-manager-dynamic-instantiation

### Install software

You need the following software in order to run VisionLord:

* [go](https://golang.org/doc/install) (for the HTTPS server)
* [node.js](https://nodejs.org/en/download/package-manager/) (for the dependencies)

### Install dependencies

Execute the following command to install all dependencies (for example Polymer) into a `node_modules` folder:

```
npm install
```

## Start HTTPS server

Start the local HTTPS server which serves the index.html:

```
npm start
```

## Use VisionLord

* Open the application in your browser: https://localhost:1337
* Connect your Arduino device to the computer via USB
* Click the "connect" button in the top left
* Choose the "Arduino Leonardo" in the prompt



## Concepts

### Send data from the browser to the DMX512 interface

* USBManager gets connection to the Arduino
* DmxOutput can generate an array[512] out of all DmxDevices
* The data of DmxOutput is send to Arduino via ArduinoLeonardoETHDriver
* The ArduinoLeonardoETHDriver has a reference to the DMXPort



## Contributors

* [Gregor Adams](https://github.com/pixelass)
