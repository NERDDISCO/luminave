# fivetwelve – DMX512 light control library

[![Build Status](https://travis-ci.org/beyondscreen/fivetwelve.svg?branch=master)](https://travis-ci.org/beyondscreen/fivetwelve)

The fivetwelve library provides abstractions in Javascript to control professional light-equipment via the DMX512-protocol.

> NOTE: I have been using this library successfully in
> [several][youtube-jsconfeu] [different][youtube-jsconfbp]
> [talks][youtube-jsconfasia] I gave and I am doing my best to
> provide a good documentation for it. However, except for the unit-tests,
> I am not doing a lot of testing on different platforms or in different
> usage scenarios. So, if you want to use this and something in this
> documentation seems unclear or something doesn't work, please feel
> invited to [write an issue][issues] with any question you might have.

[youtube-jsconfeu]: https://www.youtube.com/watch?v=ani_MOZt5_c
[youtube-jsconfbp]: https://www.youtube.com/watch?v=KkV4alDBVhk
[youtube-jsconfasia]: https://www.youtube.com/watch?v=Ody93kpAjAY
[issues]: https://github.com/beyondscreen/fivetwelve/issues

## Background

The [DMX512 standard][wikipedia-DMX] (for "Digital Multiplex with 512 pieces of information", often just "DMX") defines the data-protocol that is used for almost any kind of professional lighting equipment in use today. The protocol defines a list of 512 DMX-channels, each of which has an unsigned byte-value assigned. Those 512 bytes are transmitted at a variable rate of up to around 50 frames per second to all devices connected to the DMX-bus. One such DMX-bus is also called "DMX-universe".

Typical DMX-Setups will contain a single sender (the light desk) and any number of receivers (switches, dimmers, automated lights and so on). Every receiving device uses a static starting-address that is configured at the device. The device then reads a number of channel-values starting at that address to control the different features of the device. How the channel-values are interpreted is entirely vendor- and device-specific and is documented in the device-manual. For example, a simple RGB-spotlight could be using 4 channels to control the brightness and color (1 channel for brightness, 1 channel for each of the RGB-Components) of the light.

Since modern automated lights typically use quite a lot of channels for every device, todays larger theatre-setups mostly use multiple DMX-universes to be able to control them all.

In even larger installations, other protocols like [ArtNET][wikipedia-ArtNET] come into play. But those protocols are just a way to transport huge amounts of DMX-Data over a network. But only very few devices support ArtNET directly, most of them are only controllable using DMX.

[wikipedia-DMX]: https://en.wikipedia.org/wiki/DMX512
[wikipedia-ArtNET]: https://en.wikipedia.org/wiki/Art-Net


## Installation

This package can be installed from npm

    npm install --save fivetwelve

In addition to the core-library you will need to use a driver to actually send the dmx-data. Drivers are also available in npm and usually have their names prefixed with `fivetwelve-driver`. So, if you want to use ArtNet as output-interface you can use

    npm install --save fivetwelve-driver-artnet


## A note about ES6

This module is written using ES6-Syntax and features. If you are using ES6 in your project you can import the module like so:

```javascript
import fivetwelve from 'fivetwelve';
import ArtNetDriver from 'fivetwelve-driver-artnet';

// ...
```

*(please note that, depending on your compiler-setup (browserify/babel for instance), you might need to whitelist the module using babels ignore-setting. Using `ignore: /node_modules\/(?!fivetwelve)/` worked for me).*

Alternatively you can use the compiled ES5-Version that comes with this package by appending `/es5` to the module-names:

```javascript
var fivetwelve = require('fivetwelve/es5');
var ArtNetDriver = require('fivetwelve-driver-artnet/es5');

// ...
```

For the rest of the documentation ES6-Syntax is assumed.


# Usage

## API-Overview

This package defines a set of classes that provide the basic functionality to easily control large-scale light-installations

 * `DmxOutput`: owns the data-buffers for all dmx-universes, manages
   frame-timing for dmx-data and communication with the driver.
 * `DmxDevice`: provides a simple API to manipulate light-fixtures.
 * `DeviceGroup`: a collection of `DmxDevice` instances that exposes
     an interface identical to that of the contained devices.
 * `param.*`: the different `DmxParam`-classes handle the conversion
     between the logical-values used by your program and the corresponding
     DMX-values on the wire.


## DmxOutput

The `DMXOutput` is the final destination for all dmx-data. It creates and holds the dmx-buffers (a 512 byte `Buffer` per universe) for all dmx-universes and takes care of the communication with the dmx-interface via a Driver. Usually there should only be a single output-instance in an application. Every `DMXDevice` needs to be connected to this output-instance.

When creating an output-instance you need to specify the number of universes (defaults to 1) and a driver to use.

### initialize the output / automatic timing

The default export of the library is a function that will call the DmxOutput-constructor, so the normal setup will look something like this:

```javascript
import fivetwelve from 'fivetwelve';

// create a driver to handle the dmx-frames
const driver = { send(buffer, universe) {} };

// create an output using the specified driver
const output = fivetwelve(driver);

// start the output at 30 frames/second.
output.start(1000 / 30);
```

Initialized this way, the output will automatically send dmx-frames at a fixed rate of 30 FPS and any modification of the dmx-buffers will be sent automatically with the next frame.

### requestDmxFrame

In order to keep pace with sending of the dmx-frames, the output provides a method `requestDmxFrame()` which works pretty much like `requestAnimationFrame()` used for animations on websites. The callback passed to `requestDmxFrame` will be invoked immediately before the next dmx data-frame is sent:

```javascript

const output = fivetwelve(driver);

output.requestDmxFrame(function loop(time) {
  const buffer = output.getBuffer();
  // ... update dmx-buffer(s) ...

  // register the loop-function again for the next frame
  output.requestDmxFrame(loop);
});

output.start(1000/30);
```


### sending frames manually

As an alternative, you can decide to handle the timing yourself. In this case you need to call `output.send()` to send the current dmx-buffer to the driver:

```javascript
const output = fivetwelve(driver);

const buffer = output.getBuffer();
// ... do some buffer-modifications ....

// send the current state of the buffers
output.send();
```


### support for multiple universes

If you want to control multiple DMX-universes with a single output, you can specify the number of universes to the initializer:

```javascript
// create an output with two universes
const output = fivetwelve(driver, 2);

// access the buffers (note the universe-number is 1-based, as all
// numbers  in the DMX standard are)
const universeA = output.getBuffer(1);
const universeB = output.getBuffer(2);
```


## DmxDevice

A DmxDevice represents a single lighting fixture in your setup. Devices are defined by specifying a device-address and a list of parameters. For example, a simple lamp that supports RGB color-mixing and brightness-control might be defined like this:

```javascript
import fivetwelve from 'fivetwelve';

const output = fivetwelve(…);

// start the output with 30FPS
output.start(30);

const device = new fivetwelve.DmxDevice(1, {
    brightness: new fivetwelve.param.RangeParam(1),
    color: new fivetwelve.param.RgbParam([2,3,4])
});

// connect the device to the dmx-output
device.setOutput(output);

// set some values
device.brightness = 1;
device.color = '#ffaa00';
```

In this case we define a device at address 1 with two parameters using four dmx-channels: channel 1 is used to control the brightness (dimmer) and channels 2 through 4 control red, green and blue values.

All DMX channel-numbers and adresses are 1-based, so channel 1 of a device with address 1 will set the first overall channel of the DMX-universe. This was chosen to reflect how you'll see it in all manuals and settings of real-world devices.


## DeviceGroups

## Parameters

The parameters are the backbone of the whole library, although they are intended to remain invisible most of the time. They convert values between the DMX-format and a logical format to be used by your programs.

Parameters are exposed by the device using "magic"-properties with custom getters and setters. So you can just set Object-properties and don't need to care about anything happening behind the scenes. So, a simple moving-head spotlight can be defined like this:

```javascript
import {DmxDevice, param} from 'fivetwelve';

let device = new fivetwelve.DmxDevice(1, {
  // a typical moving-head has a pan-range of 540° and tilt-range
  // of around 240° with 16-bit resolution. The 16 bits are spread
  // across 2 dmx-channels (in this case channels 3/4 and 5/6).
  pan: new param.HiResParam([3, 4], {min: -270, max: 270}),
  tilt: new param.HiResParam([5, 6], {min: -120, max: 120}),

  // the dimmer uses single dmx-channel and is mapped to a range
  // from 0 to 1, which is the default.
  brightness: new param.RangeParam(2),

  // the shutter can only have two states, 'open' and 'closed'.
  // Each of these states is mapped to a range of dmx-values (this
  // is something very common with dmx-devices as these are
  // sometimes still controlled by simple faders with limited
  // precision).
  shutter: new param.MappedParam(1, { open: [9, 16], closed: [0, 8]}),

  // finally there is a CMY color-mixing unit controlled via three
  // channels.
  color: new param.RgbParam([7, 8, 9], Color.CMY)
});


// setting a basic light-scene:
device.brightness = 1; // full brightness
device.shutter = 'open'; // open the shutter
device.pan = 0; // pan: center-position
device.tilt = 45; // tilt by 45°
device.color = '#ff0000'; // red color
```


