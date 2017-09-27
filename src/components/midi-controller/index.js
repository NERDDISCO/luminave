/*

Purpose: Handle a specific MIDI controller, listen to events, trigger customEvents
Current implementation: core/MidiController.js

<midi-controller controller="midiController" on-noteon="handleNoteon" on-noteoff="handleNoteoff" />

midiController = core/MidiController
on-noteon = Based on the mapping defined for this controller, there will be an event @see MidiController#noteon()


The MIDI contoller defines a layout, which can be used to create a visual representation of the controller itself:


"midi": [{
  "name": "nanoPAD2",
  "manufacturer": "KORG INC.",
  "controllerId": "korgnanopad2",
  "input": "nanoPAD2 PAD",
  "output": "nanoPAD2 CTRL",
  "layout": {
    "height": 2,
    "width": 9,
    "parts": [{
        "note": 37,
        "type": "button",
        "y": 0,
        "x": 1,
        "partId": "button1"
      },
      {
        "note": 39,
        "type": "button",
        "y": 0,
        "x": 2,
        "partId": "button2"
      },
      {
        "note": 41,
        "type": "button",
        "y": 0,
        "x": 3,
        "partId": "button3"
      },
      {
        "note": 43,
        "type": "button",
        "y": 0,
        "x": 4,
        "partId": "button4"
      },
      {
        "note": 45,
        "type": "button",
        "y": 0,
        "x": 5,
        "partId": "button5"
      },
      {
        "note": 47,
        "type": "button",
        "y": 0,
        "x": 6,
        "partId": "button6"
      },
      {
        "note": 49,
        "type": "button",
        "y": 0,
        "x": 7,
        "partId": "button7"
      },
      {
        "note": 51,
        "type": "button",
        "y": 0,
        "x": 8,
        "partId": "button8"
      },
      {
        "note": 36,
        "type": "button",
        "y": 1,
        "x": 1,
        "partId": "button9"
      },
      {
        "note": 38,
        "type": "button",
        "y": 1,
        "x": 2,
        "partId": "button10"
      },
      {
        "note": 40,
        "type": "button",
        "y": 1,
        "x": 2,
        "partId": "button11"
      },
      {
        "note": 42,
        "type": "button",
        "y": 1,
        "x": 2,
        "partId": "button12"
      },
      {
        "note": 44,
        "type": "button",
        "y": 1,
        "x": 2,
        "partId": "button13"
      },
      {
        "note": 46,
        "type": "button",
        "y": 1,
        "x": 2,
        "partId": "button14"
      },
      {
        "note": 48,
        "type": "button",
        "y": 1,
        "x": 2,
        "partId": "button15"
      },
      {
        "note": 50,
        "type": "button",
        "y": 1,
        "x": 2,
        "partId": "button16"
      }
    ]
  }
}]
}

*/
