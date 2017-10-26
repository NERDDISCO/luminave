export default {
  'name': 'jsconf-budapest-2017',
  'global': {
    'fps': 60,
    'dimmer': 255,
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
    'animationId': 'an_shutter_open',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'shutter',
      'keyframes': [
        { 'time': 0, 'value': 'open' },
        { 'time': 1, 'value': 'open' }
      ]
    }]},

    {
    'animationId': 'an_goboOpen',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'goboOpen',
      'keyframes': [
        { 'time': 0, 'value': 'gobo' },
        { 'time': 1, 'value': 'gobo' }
      ]
    }]},

    {
    'animationId': 'an_gobo2',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo2',
      'keyframes': [
        { 'time': 0, 'value': 'gobo2' },
        { 'time': 1, 'value': 'gobo2' }
      ]
    }]},

    {
    'animationId': 'an_gobo3',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo3',
      'keyframes': [
        { 'time': 0, 'value': 'gobo3' },
        { 'time': 1, 'value': 'gobo3' }
      ]
    }]},

    {
    'animationId': 'an_gobo4',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo4',
      'keyframes': [
        { 'time': 0, 'value': 'gobo4' },
        { 'time': 1, 'value': 'gobo4' }
      ]
    }]},

    {
    'animationId': 'an_gobo5',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo5',
      'keyframes': [
        { 'time': 0, 'value': 'gobo5' },
        { 'time': 1, 'value': 'gobo5' }
      ]
    }]},

    {
    'animationId': 'an_gobo6',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo6',
      'keyframes': [
        { 'time': 0, 'value': 'gobo6' },
        { 'time': 1, 'value': 'gobo6' }
      ]
    }]},

    {
    'animationId': 'an_gobo7',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo7',
      'keyframes': [
        { 'time': 0, 'value': 'gobo7' },
        { 'time': 1, 'value': 'gobo7' }
      ]
    }]},

    {
    'animationId': 'an_gobo8',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo8',
      'keyframes': [
        { 'time': 0, 'value': 'gobo8' },
        { 'time': 1, 'value': 'gobo8' }
      ]
    }]},

    {
    'animationId': 'an_strobe_slow',
    'duration': 8,
    'name': '',
    'timeline': [{
      'name': 'shutter',
      'keyframes': [
        { 'time': 0, 'value': 'shutter(20)' },
        { 'time': 1, 'value': 'shutter(20)' }
      ]
    }]},

    {
    'animationId': 'an_strobe_average',
    'duration': 8,
    'name': '',
    'timeline': [{
      'name': 'shutter',
      'keyframes': [
        { 'time': 0, 'value': 'shutter(80)' },
        { 'time': 1, 'value': 'shutter(80)' }
      ]
    }]},

    {
    'animationId': 'an_strobe_fast',
    'duration': 8,
    'name': '',
    'timeline': [{
      'name': 'shutter',
      'keyframes': [
        { 'time': 0, 'value': 'shutter(160)' },
        { 'time': 1, 'value': 'shutter(160)' }
      ]
    }]},

    {
      'animationId': 'fogfogfog',
      'duration': 8,
      'name': 'This is a funny animation',
      'timeline': [{
        'name': 'amount',
        'value': 0,
        'keyframes': [{
          'time': 0,
          'value': 255
        }, {
          'time': 0.8,
          'value': 255
        }, {
          'time': 1,
          'value': 0
        }]
      }]
    }],





/****************************************************************************

  Scenes

*/

  'scenes': [{
    'sceneId': 'test_movinghead_mx50',
      'name': '',
      'active': 'loop',
      'midi': {
        'controllerId': 'korgnanopad2',
        'partId': 'button1'
      },
      'layers': [{
        'layerId': 'layer1',
        'devices': ['stairville_mx50_1'],
        'animations': [{
          'start': 0,
          'animationId': 'an_shutter_open'
        }]
      }]
  }],






  'devices': {
    'dmx': [{
      'deviceId': 'stairville_mx50_1',
      'type': 'StairvilleMhX50LedSpotMovingHead',
      'name': 'Stairville MH-X50 LED Spot Moving Head',
      'universe': 1,
      'address': 1
      }, {
        'deviceId': 'fogmaschine',
        'type': 'StairvilleAF150',
        'name': 'Stairville AF-150',
        'universe': 1,
        'address': 46
      }],
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
    }]
  }
}
