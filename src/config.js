export default {
  'name': 'new-years-eve-2017',

  'global': {
    'fps': 60,
    'dimmer': 0,
    'color': [0, 255, 0],
    'useModV': true,
    'bpm': 0
  },

  'dmxInterface': {
    'universeAmount': 1,
    'driver': 'ArduinoLeonardoETHDriver',
    'connected': false,
    'serialport': { 'path': '/dev/cu.usbserial-EN193448' },
    'buffer': ''
  },

  'server': {
    'port': 3000,
    'websocket': {
      'url': 'ws://localhost:',
      'path': {
        'midi': '/midi',
        'modV': '/modV'
      }
    }
  },





  /****************************************************************************

    Animations

  */

  'animations': [

    {
      'animationId': 'an_array',
      'duration': 8,
      'name': 'An array of Integer values, usually used for RGB',
      'timeline': [{
        'name': 'color',
        'keyframes': [
          { 'time': 0, 'value': [0, 0, 0] },
          { 'time': 0.25, 'value': [255, 0, 0] },
          { 'time': 0.5, 'value': [0, 255, 0] },
          { 'time': 0.75, 'value': [0, 0, 255] },
          { 'time': 1, 'value': [0, 0, 0] }
        ]
      }]
    },

    {
      'animationId': 'an_value',
      'duration': 8,
      'name': 'A single Integer value',
      'timeline': [{
        'name': 'uv',
        'keyframes': [
          { 'time': 0, 'value': 0 },
          { 'time': 0.5, 'value': 255 },
          { 'time': 1, 'value': 0 }
        ]
      }]
    },

    {
      'animationId': 'an_property',
      'duration': 8,
      'name': 'A property of a DMX device, which is hardcoded',
      'timeline': [{
        'name': 'gobo',
        'keyframes': [
          { 'time': 0, 'value': 'gobo2' },
          { 'time': 1, 'value': 'gobo2' }
        ]
      }]
    },

    {
      'animationId': 'an_function',
      'duration': 8,
      'name': 'A value as part of a function, because the same DMX property can have different sub-functions on the same channel',
      'timeline': [{
        'name': 'goboRotation',
        'keyframes': [
          { 'time': 0, 'value': 'positive(0.5)' },
          { 'time': 1, 'value': 'positive(0.75)' }
        ]
      }]
    },

  ], // / Animations





/****************************************************************************

  Scenes

*/

  'scenes': [
    {
      'sceneId': 'test_colors',
      'name': '',
      'active': 'loop',
      'midi': {
        'controllerId': 'korgnanopad2',
        'partId': 'button1'
      },
      'layers': [
        {
          'layerId': 'layer1',
          'devices': ['fungeneration_par_1', 'fungeneration_par_2'],
          'animations': [{
            'start': 0,
            'animationId': 'an_array'
          }]
        }
      ]
    },

    {
      'sceneId': 'test_uv',
      'name': '',
      'active': false,
      'midi': {
        'controllerId': 'korgnanopad2',
        'partId': 'button2'
      },
      'layers': [
        {
          'layerId': 'layer1',
          'devices': ['fungeneration_par_1', 'fungeneration_par_2'],
          'animations': [{
            'start': 0,
            'animationId': 'an_value'
          }]
        }
      ]
    }

  ], // / Scenes




  /****************************************************************************

    Devices

  */

  'devices': {
    'dmx': [
      {
        'deviceId': 'fungeneration_par_1',
        'type': 'FunGenerationSeParQuadLedRgbUv',
        'name': 'Fun Generation PAR 1',
        'universe': 1,
        'address': 1
      },
      {
        'deviceId': 'fungeneration_par_2',
        'type': 'FunGenerationSeParQuadLedRgbUv',
        'name': 'Fun Generation PAR 2',
        'universe': 1,
        'address': 7
      }
    ], // / DMX

    'midi': [{
      'name': 'nanoPAD2',
      'manufacturer': 'KORG INC.',
      'controllerId': 'korgnanopad2',
      'input': 'nanoPAD2 PAD',
      'output': 'nanoPAD2 CTRL',
      'layout': {
        'height': 2,
        'width': 9,
        'parts': [{
            'note': 37,
            'type': 'button',
            'y': 0,
            'x': 1,
            'partId': 'button1'
          }, {
            'note': 39,
            'type': 'button',
            'y': 0,
            'x': 2,
            'partId': 'button2'
          }, {
            'note': 41,
            'type': 'button',
            'y': 0,
            'x': 3,
            'partId': 'button3'
          }, {
            'note': 43,
            'type': 'button',
            'y': 0,
            'x': 4,
            'partId': 'button4'
          }, {
            'note': 45,
            'type': 'button',
            'y': 0,
            'x': 5,
            'partId': 'button5'
          }, {
            'note': 47,
            'type': 'button',
            'y': 0,
            'x': 6,
            'partId': 'button6'
          }, {
            'note': 49,
            'type': 'button',
            'y': 0,
            'x': 7,
            'partId': 'button7'
          }, {
            'note': 51,
            'type': 'button',
            'y': 0,
            'x': 8,
            'partId': 'button8'
          }, {
            'note': 36,
            'type': 'button',
            'y': 1,
            'x': 1,
            'partId': 'button9'
          }, {
            'note': 38,
            'type': 'button',
            'y': 1,
            'x': 2,
            'partId': 'button10'
          }, {
            'note': 40,
            'type': 'button',
            'y': 1,
            'x': 2,
            'partId': 'button11'
          }, {
            'note': 42,
            'type': 'button',
            'y': 1,
            'x': 2,
            'partId': 'button12'
          }, {
            'note': 44,
            'type': 'button',
            'y': 1,
            'x': 2,
            'partId': 'button13'
          }, {
            'note': 46,
            'type': 'button',
            'y': 1,
            'x': 2,
            'partId': 'button14'
          }, {
            'note': 48,
            'type': 'button',
            'y': 1,
            'x': 2,
            'partId': 'button15'
          }, {
            'note': 50,
            'type': 'button',
            'y': 1,
            'x': 2,
            'partId': 'button16'
          }]
      }
    }] // / MIDI
  } // / Devices
}
