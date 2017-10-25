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
  'animations': [

    {
    'animationId': 'a_movingheadtest',
    'duration': 6,
    'name': 'Test the Stairville MX50',
    'timeline': [{
      'name': 'colorWheel',
      'keyframes': [
        { 'time': 0, 'value': 'white' },
        { 'time': 0.5, 'value': 'green' },
        { 'time': 1, 'value': 'pink' }
      ]}, {
        'name': 'gobo',
        'keyframes': [
          { 'time': 0, 'value': 'gobo2' },
          { 'time': 0.5, 'value': 'gobo5Shake(0.5)' },
          { 'time': 1, 'value': 'gobo5Shake(0.5)' }
      ]}
    ]},

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

  'scenes': [{
    'sceneId': 'test_movinghead_mx50',
      'name': 'This is my awesome first scene',
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
          'animationId': 'a_movingheadtest'
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
