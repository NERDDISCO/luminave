# VisionLord

Show light manager for DMX512 shows.

## Stable

 [![1.0.0](https://img.shields.io/badge/VisionLord-1.0-00f557.svg?style=flat)](https://github.com/NERDDISCO/VisionLord/releases/tag/1.0.0)

## Requirements

* Chrome 63+ (native WebUSB)
* node.js ([How to install](https://nodejs.org/en/download/package-manager/))

## Setup

```bash
# clone VisionLord
git clone git@github.com:NERDDISCO/VisionLord.git

# go into directory
cd VisionLord

# install dependencies
npm install
```

## Run

Start the local HTTPS server on https://localhost:1337:

❗️accept the unsigned certificate❗️

```bash
npm start
```

### Add WebUSB DMX512 controller

* Connect your Arduino to the computer via USB
* Click the "USB" button in the top left in VisionLord
* Choose the "Arduino Leonardo" in the prompt

---

# Features

* Handle one DMX512 universe
* Add fixtures of different types (using the [DmxDevice](https://github.com/beyondscreen/fivetwelve/blob/master/lib/device/DmxDevice.js) implementation of [fivetwelve](https://github.com/beyondscreen/fivetwelve)) to have an abstraction of the fixture and to be able to use properties instead of setting the values on the channels itself. So for example you can set the `color` property, which accepts an RGB value as `[255, 0, 125]` and fivetwelve knows how to split that into the corresponding channels
* You can change the properties of a fixture with various input fields depending on which property you want to change
* Add animations, which can contain a variable amount of keyframes. Each keyframe can have a variable amount of fixture properties. In terms of code this looks like this:
```json
{
    "0": {
      "color": [255, 0, 0],
      "dimmer": 255
    },
    "1": {
      "color": [0, 0, 50],
      "dimmer": 120
    }
}
```
* The animation itself has no idea about time, it always goes from 0 to 1. You can add as many steps inbetween as you want
* Scenes are the way to go to bring fixtures and animations together
* Connect a MIDI controller via USB to your computer and add it as a MIDI controller into VisionLord. With "MIDI learn" you can push a button on your MIDI controller and VisionLord saves the corresponding note into it's config, so you don't have to manually find out what note is on with button
* Add scenes to MIDI controller buttons to activate them when the MIDI button is pushed
* When a scene is active it is added to the timeline. The timeline handles all scenes and can be started / stopped
* Connect to a USB DMX controller that implements the WebUSB specification
* Connect to a modV WebSocket bridge to get colors from modV instead of setting the colors yourself
* Connect to a fivetwelve WebSocket bridge to send your universe to a DMX controller that is controlled by fivetwelve

---

# Technologies

[![polymer 3](https://img.shields.io/badge/polymer-3.0_preview-f50057.svg?style=flat)](https://www.polymer-project.org/blog/2017-08-22-npm-modules)
[![Redux](https://img.shields.io/badge/Redux-3.7.2-9f33ff.svg?style=flat)](https://redux.js.org/)

[![ES6 modules](https://img.shields.io/badge/ES6-modules-1e88e5.svg?style=flat)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
[![WebUSB](https://img.shields.io/badge/API-WebUSB-1e88e5.svg?style=flat)](https://wicg.github.io/webusb/)
[![WebMIDI](https://img.shields.io/badge/API-WebMIDI-1e88e5.svg?style=flat)](https://webaudio.github.io/web-midi-api/)
[![WebBluetooth](https://img.shields.io/badge/API-WebBluetooth-1e88e5.svg?style=flat)](https://webbluetoothcg.github.io/web-bluetooth/)
[![WebSocket](https://img.shields.io/badge/API-WebSocket-1e88e5.svg?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
[![localStorage](https://img.shields.io/badge/API-localStorage-1e88e5.svg?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

# Integration

## modV

If you want to use modV you have to start the local WebSocket server too:

### In VisionLord

* Go into the `modV` folder
* Start the server with `npm start`
* Click the "connect" button of the modV component in the VisionLord UI

### In modV

* Drop the "grabCanvas" component into the list of modules
* This should connect to the local WebSocket server


## fivetwelve

If you want to use fivetwelve:

* Download and install [fivetwelve-bridge](https://github.com/usefulthink/fivetwelve-bridge/)
* Start the WebSocket server provided by fivetwelve-bridge with `npm start`
* In VisionLord: Click the "connect" button of the fivetwelve component

If you start the timeline all data is also send to fivetwelve

---


# Software

You need the following software in order to use VisionLord:

## Browser

* VisionLord can only be used in Chrome 61+ right now

### Chrome 61 + 62

* Native support for ES6 modules
* Enable flags for WebUSB and WebMIDI
  * chrome://flags/#enable-experimental-web-platform-features
  * chrome://flags/#enable-midi-manager-dynamic-instantiation

### Chrome 63+

* Native support for WebUSB
* Enable flag for WebMIDI
  * chrome://flags/#enable-midi-manager-dynamic-instantiation
* [Dynamic import()](https://developers.google.com/web/updates/2017/11/dynamic-import)


## Arduino

### Arduino IDE

To develop Arduino Sketches in C++, push that code into the Arduino and run it: [Arduino IDE](https://www.arduino.cc/en/Main/Software)

### Arduino Libraries

Install the libraries from [arduino/libraries](arduino/libraries) into the [Arduino library folder](https://www.arduino.cc/en/Guide/Libraries#toc5)

Then upgrade the Arduino IDE from USB 2.0 to 2.1: Go into the installation directory of your Arduino IDE and open `hardware/arduino/avr/cores/arduino/USBCore.h`. Then find the line `#define USB_VERSION 0x200` and change `0x200` to `0x210`. (@see [Step 3](https://github.com/webusb/arduino#getting-started))

---

# Hardware

## Arduino

### Compatible board

In order to use WebUSB, the Arduino board needs microcontroller that gives it full control over the USB hardware. The [ATmega32u4](http://www.microchip.com/wwwproducts/en/ATmega32U4) is one of them and is used in these boards:

* Arduino Leonardo / Leonard ETH
* Arduino Micro
* Arduino Zero

### IDE

1. Start the Arduino IDE
2. [Find out which Arduino you are using or to which Arduino your microcontroller is compatible to](#which-arduino-do-i-have)
3. [Use the instructions](https://www.arduino.cc/en/Guide/HomePage) provided for your model (for example [Leonardo / Micro](https://www.arduino.cc/en/Guide/ArduinoLeonardoMicro)) to configure the Arduino IDE
   1. Select the model: Tools -> Board
   2. Select the USB port: Tools -> Port
4. Create a new sketch in Arduino IDE: File -> New
5. Remove everything in the new sketch
6. Copy the code from [arduino/sketch/LeonardoETH.ino](arduino/sketch/LeonardoETH.ino) into the new sketch
7. Upload the code to the connected Arduino: Sketch -> Upload

### Coding Reference

* https://www.arduino.cc/en/Reference/HomePage

### Which Arduino do I have?

#### Chrome

Chrome provides a build-in device-log `chrome://device-log` which can be used to identify the connected USB device:

```
[21:46:31] USB device added: vendor=10755 "Unknown", product=32832 "Arduino Leonardo ETH", serial="WUART", guid=fb98cfd4-48aa-4795-b439-ecc736986cee
```

* `vendor=10755`: The ID of the USB device Vendor
* `product=32832`: The ID of the USB device
* `"Arduino Leonardo ETH"`: The exact name of the USB device

`vendor` & `product` can be [converted to hex](#convert-decimal-to-hex) in order to use them as a filter for WebUSB.


#### MacOS

* Connect the Arduino via USB to your computer
* Execute the following command:

```
ioreg -p IOUSB -w0 -l
```

This will list all USB devices, for example (which means you have an "Arduino Micro"):

```
    +-o Arduino Micro@14100000  <class AppleUSBDevice, id 0x100002626, registered, matched, active, busy 0 (40 ms), retain 22>
        {
          "sessionID" = 119957228755640
          "iManufacturer" = 1
          "bNumConfigurations" = 1
          "idProduct" = 32823
          "bcdDevice" = 256
          "Bus Power Available" = 500
          "USB Address" = 21
          "bMaxPacketSize0" = 64
          "iProduct" = 2
          "iSerialNumber" = 3
          "bDeviceClass" = 239
          "Built-In" = No
          "locationID" = 336592896
          "bDeviceSubClass" = 2
          "bcdUSB" = 528
          "USB Product Name" = "Arduino Micro"
          "PortNum" = 1
          "non-removable" = "no"
          "IOCFPlugInTypes" = {"9dc7b780-9ec0-11d4-a54f-000a27052861"="IOUSBFamily.kext/Contents/PlugIns/IOUSBLib.bundle"}
          "bDeviceProtocol" = 1
          "IOUserClientClass" = "IOUSBDeviceUserClientV2"
          "IOPowerManagement" = {"DevicePowerState"=0,"CurrentPowerState"=3,"CapabilityFlags"=65536,"MaxPowerState"=4,"DriverPowerState"=3}
          "Device Speed" = 1
          "USB Vendor Name" = "Arduino LLC"
          "idVendor" = 9025
          "IOGeneralInterest" = "IOCommand is not serializable"
          "USB Serial Number" = "WUART"
          "IOClassNameOverride" = "IOUSBDevice"
        }
```

* `USB Product Name`: The exact name of the USB device
* `idVendor`: The ID of the USB device Vendor (for example Arduino LLC)
* `idProduct`: The ID of the USB device

`idVendor` & `idProduct` can be [converted to hex](#convert-decimal-to-hex) in order to use them as a filter for WebUSB.

---

## Arduino Shield: 2.5kV Isolated DMX 512

* Shield: https://www.tindie.com/products/Conceptinetics/25kv-isolated-dmx-512-shield-for-arduino-r2/
* http://dmxshield.blogspot.de/2013/04/conceptinetics-dmx-library-for-arduino.html#comment-form

### Library: Conceptinetics

* [Documentation](https://sourceforge.net/p/dmxlibraryforar/wiki/)
* [DMX library for Arduino](https://sourceforge.net/projects/dmxlibraryforar/)

### Update to newer version

The following steps are not needed (if you are using an Arduino Leonardo ETH), because you can find an updated version of the Conceptinetics lib already in this repo.

* Install the lib into your Arduino library folder
* Change the following lines in `Conceptinetics.h`
```
// Fix some settings for Arduino Leonardo ETH  
// https://sourceforge.net/p/dmxlibraryforar/wiki/Getting%20DMX%20library%20to%20work%20on%20Arduino%20Leonardo/
// Comment this line
// #define USE_DMX_SERIAL_0

// Uncomment this line
#define USE_DMX_SERIAL_1

// Decrease the length of the automatic baudrate breaks  
// Comment this line
// #define DMX_BREAK_RATE 	 	    49950

// Uncomment this line
#define DMX_BREAK_RATE 	 	    99900
```



---

## Convert decimal to hex

In JavaScript you can convert a decimal number into a hex like this (e.g. in the console of your browser):

```
// vendor = 10755 -> 2a03
let vendorId = 10755
vendorId.toString(16)

// productId = 32832 -> 8040
let productId = 32832
productId.toString(16)
```

These values with the prefix `0x` can be used as a filter when you request access to a specific USB device:

```
navigator.usb.requestDevice({
  filters: [{
      'vendorId': 0x2a03,
      'productId': 0x8040
  }]
}).then(device => console.log(device))
```

---


# Server

Right now I'm using Go to provide a HTTPS server. You don't have to use Go in order to use VisionLord, you can use any server that can serve static HTML files over HTTPS.

### Changes to the server

The server is written in Go, so if you want to change the code you have to install [go](https://golang.org/doc/install)


### Build a new version of the server

* Install [goreleaser](https://goreleaser.com/)
* Go into "server/" and excute `goreleaser --snapshot`
* This will generate binaries for MacOS, Linux and Windows in 64bit


---

# WebUSB

## Resources

* https://speakerdeck.com/fadis/webusbdereiyagadi-maruwebkai-fa

---

# Contributors

* [Gregor Adams](https://github.com/pixelass)
* [Kevin Gimbel](https://github.com/kevingimbel)

# Thanks to

* [Gregor Adams](https://github.com/pixelass) for working with me on VisionLord, hours and hours of pair-programming and knowledge transfer, partner in debugging the most ugly performance problems and everything else ❤️
* [Martin Schuhfuss](https://github.com/usefulthink) for fivetwelve and a lot of DMX512 knowledge ❤️
* [Sam Wray](https://github.com/2xaa) for creating [modV](https://github.com/2xAA/modV) and helping me to integrate modV into everything related to NERD DISCO
