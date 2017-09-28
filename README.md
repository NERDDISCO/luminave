# VisionLord

Show light manager for DMX512 shows.

[![polymer 3](https://img.shields.io/badge/polymer-3.0_preview-f50057.svg?style=flat)](https://www.polymer-project.org/blog/2017-08-22-npm-modules)
[![ES6 modules](https://img.shields.io/badge/ES6-modules-44aa44.svg?style=flat)](https://www.polymer-project.org/blog/2017-08-22-npm-modules)

[![WebUSB](https://img.shields.io/badge/API-WebUSB-1e88e5.svg?style=flat)](https://wicg.github.io/webusb/)
[![WebMIDI](https://img.shields.io/badge/API-WebMIDI-1e88e5.svg?style=flat)](https://webaudio.github.io/web-midi-api/)


* Only works in a browser that supports ES6 modules & WebUSB (>= Chrome 63)
* In order to use WebUSB (even on localhost), you need an HTTPS server

# Software

### Chrome
* Enable experimental flags
  * chrome://flags/#enable-experimental-web-platform-features
  * chrome://flags/#enable-midi-manager-dynamic-instantiation

### Install software

You need the following software in order to run VisionLord:

* [go](https://golang.org/doc/install) (for the HTTPS server)
* [node.js](https://nodejs.org/en/download/package-manager/) (for the dependencies)
* [Arduino IDE](https://www.arduino.cc/en/Main/Software)

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

1. Install the libraries from "arduino/libraries" [into the Arduino library folder](https://www.arduino.cc/en/Guide/Libraries#toc5)
2. Start the IDE
3. Find out which Arduino you are using or to which Arduino your microcontroller is compatible to
4. [Use the instructions](https://www.arduino.cc/en/Guide/HomePage) provided for your model to configure Arduino IDE
5. Copy the code from arduino/sketch/LeonardoETH.ino into Arduino IDE
6. Upload the code to the connected Arduino

### Coding Reference

* https://www.arduino.cc/en/Reference/HomePage

### Which Arduino do I have?

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

#### Identify your USB device

* `USB Product Name`: The exact name of the USB device
* `idVendor`: The ID of the USB device Vendor (for example Arduino LLC)
* `idProduct`: The ID of the USB device

`idVendor` & `idProduct` can be converted to hex in order to use them as a filter for WebUSB.

---

## Arduino Shield: 2.5kV Isolated DMX 512

* Shield: https://www.tindie.com/products/Conceptinetics/25kv-isolated-dmx-512-shield-for-arduino-r2/
* http://dmxshield.blogspot.de/2013/04/conceptinetics-dmx-library-for-arduino.html#comment-form

### Library: Conceptinetics

* [Documentation](https://sourceforge.net/p/dmxlibraryforar/wiki/)
* [DMX library for Arduino](https://sourceforge.net/projects/dmxlibraryforar/)

### Update to newer version

The following steps are not needed (if you are using an Arduino Leonardo ETH), because you can find an updated version of the Conceptinetics lib already in the repo:

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
