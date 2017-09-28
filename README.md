# VisionLord

Show light manager for DMX512 shows.

[![polymer 3](https://img.shields.io/badge/polymer-3.0_preview-f50057.svg?style=flat)](https://www.polymer-project.org/blog/2017-08-22-npm-modules)
[![ES6 modules](https://img.shields.io/badge/ES6-modules-44aa44.svg?style=flat)](https://www.polymer-project.org/blog/2017-08-22-npm-modules)

[![WebUSB](https://img.shields.io/badge/API-WebUSB-1e88e5.svg?style=flat)](https://wicg.github.io/webusb/)
[![WebMIDI](https://img.shields.io/badge/API-WebMIDI-1e88e5.svg?style=flat)](https://webaudio.github.io/web-midi-api/)


* Only works in a browser that supports ES6 modules & WebUSB (>= Chrome 63)
* In order to use WebUSB (even on localhost), you need a https server

# Software

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

Start the local HTTPS server on https://localhost:1337:

```
npm start
```

---

# Hardware

## Arduino

### IDE

1. Find out which Arduino you are using or to which Arduino your microcontroller is compatible to
2. [Use the instructions](https://www.arduino.cc/en/Guide/HomePage) provided for your model to configure Arduino IDE
3. Have fun!

---

### Coding Reference

* https://www.arduino.cc/en/Reference/HomePage

## DMX512 Shields

### 2.5kV Isolated DMX 512

* Shield: https://www.tindie.com/products/Conceptinetics/25kv-isolated-dmx-512-shield-for-arduino-r2/
* http://dmxshield.blogspot.de/2013/04/conceptinetics-dmx-library-for-arduino.html#comment-form

#### Library

* Download the lib: https://sourceforge.net/projects/dmxlibraryforar/
* Install the lib into your Arduino library folder
* Make these changes in
`
// Fix some settings for Arduino Leonardo ETH  https://sourceforge.net/p/dmxlibraryforar/wiki/Getting%20DMX%20library%20to%20work%20on%20Arduino%20Leonardo/
// Comment this line
// #define USE_DMX_SERIAL_0

// Uncomment this line
#define USE_DMX_SERIAL_1

// Decrease the length of the automatic baudrate breaks  
// Comment this line
// #define DMX_BREAK_RATE 	 	    49950

// Uncomment this line
#define DMX_BREAK_RATE 	 	    99900
`

* Set `DMX_BREAK_RATE` to `99900` in `Conceptinetics.h`
* Documentation: https://sourceforge.net/p/dmxlibraryforar/wiki/



---


## Use VisionLord

* Open the application in your browser: https://localhost:1337
* Connect your Arduino device to the computer via USB
* Click the "connect" button in the top left
* Choose the "Arduino Leonardo" in the prompt


---


## Concepts

### Send data from the browser to the DMX512 interface

* USBManager gets connection to the Arduino
* DmxOutput can generate an array[512] out of all DmxDevices
* The data of DmxOutput is send to Arduino via ArduinoLeonardoETHDriver
* The ArduinoLeonardoETHDriver has a reference to the DMXPort



## Contributors

* [Gregor Adams](https://github.com/pixelass)
