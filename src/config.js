export default {
  'name': 'jsconf-budapest-2017',
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
    'animationId': 'an_reset',
    'duration': 6,
    'name': '',
    'timeline': [
      { 'name': 'shutter',
        'keyframes': [
          { 'time': 0, 'value': 'open' },
          { 'time': 1, 'value': 'open' }
      ]},
      { 'name': 'focus',
        'keyframes': [
          { 'time': 0, 'value': 145 },
          { 'time': 1, 'value': 145 }
      ]},
      { 'name': 'responseSpeed',
        'keyframes': [
          { 'time': 0, 'value': 1 },
          { 'time': 1, 'value': 1 }
      ]},
      { 'name': 'gobo',
        'keyframes': [
          { 'time': 0, 'value': 'goboOpen' },
          { 'time': 1, 'value': 'goboOpen' }
      ]}
    ]},

    {
    'animationId': 'an_panTilt_line',
    'duration': 8,
    'name': '',
    'timeline': [
      { 'name': 'pan',
        'keyframes': [
          { 'time': 0, 'value': 126 },
          { 'time': 1, 'value': 126 }
        ]
      },
      { 'name': 'tilt',
        'keyframes': [
          { 'time': 0, 'value': '70' },
          { 'time': 0.5, 'value': '210' },
          { 'time': 1, 'value': '70' }
        ]
      }
  ]},

  {
  'animationId': 'an_panTilt_line_reverse',
  'duration': 8,
  'name': '',
  'timeline': [
    { 'name': 'pan',
      'keyframes': [
        { 'time': 0, 'value': 126 },
        { 'time': 1, 'value': 126 }
      ]
    },
    { 'name': 'tilt',
      'keyframes': [
        { 'time': 0, 'value': '210' },
        { 'time': 0.5, 'value': '70' },
        { 'time': 1, 'value': '210' }
      ]
    }
  ]},

    {
    'animationId': 'an_goboOpen',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo',
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
      'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo2' },
        { 'time': 1, 'value': 'gobo2' }
      ]
    }]},

    {
    'animationId': 'an_gobo2_shake',
    'duration': 6,
    'name': '',
    'timeline': [
      {'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo2' },
        { 'time': 1, 'value': 'gobo2' }
      ]},
      {'name': 'goboRotation',
      'keyframes': [
        { 'time': 0, 'value': 'positive(0.5)' },
        { 'time': 1, 'value': 'positive(0.5)' }
      ]}
    ]},

    {
    'animationId': 'an_gobo3',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo3' },
        { 'time': 1, 'value': 'gobo3' }
      ]
    }]},

    {
    'animationId': 'an_gobo3_shake',
    'duration': 6,
    'name': '',
    'timeline': [
      {'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo3' },
        { 'time': 1, 'value': 'gobo3' }
      ]},
      {'name': 'goboRotation',
      'keyframes': [
        { 'time': 0, 'value': 'positive(0.5)' },
        { 'time': 1, 'value': 'positive(0.5)' }
      ]}
    ]},

    {
    'animationId': 'an_gobo4',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo4' },
        { 'time': 1, 'value': 'gobo4' }
      ]
    }]},

    {
    'animationId': 'an_gobo4_shake',
    'duration': 8,
    'name': '',
    'timeline': [
      {'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'open' },
        { 'time': 0.9, 'value': 'gobo4' },
        { 'time': 1, 'value': 'gobo4' }
      ]},
      {'name': 'goboRotation',
      'keyframes': [
        { 'time': 0, 'value': 'positive(0.5)' },
        { 'time': 0.9, 'value': 'fixed' },
        { 'time': 1, 'value': 'fixed' }
      ]}
    ]},

    {
    'animationId': 'an_gobo5',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo5' },
        { 'time': 1, 'value': 'gobo5' }
      ]
    }]},

    {
    'animationId': 'an_gobo5_shake',
    'duration': 6,
    'name': '',
    'timeline': [
      {'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo5' },
        { 'time': 1, 'value': 'gobo5' }
      ]},
      {'name': 'goboRotation',
      'keyframes': [
        { 'time': 0, 'value': 'positive(0.5)' },
        { 'time': 1, 'value': 'positive(0.5)' }
      ]}
    ]},

    {
    'animationId': 'an_gobo6',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo6' },
        { 'time': 1, 'value': 'gobo6' }
      ]
    }]},

    {
    'animationId': 'an_gobo6_shake',
    'duration': 6,
    'name': '',
    'timeline': [
      {'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo6' },
        { 'time': 1, 'value': 'gobo6' }
      ]},
      {'name': 'goboRotation',
      'keyframes': [
        { 'time': 0, 'value': 'positive(0.5)' },
        { 'time': 1, 'value': 'positive(0.5)' }
      ]}
    ]},

    {
    'animationId': 'an_gobo7',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo7' },
        { 'time': 1, 'value': 'gobo7' }
      ]
    }]},

    {
    'animationId': 'an_gobo7_shake',
    'duration': 6,
    'name': '',
    'timeline': [
      {'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo7' },
        { 'time': 1, 'value': 'gobo7' }
      ]},
      {'name': 'goboRotation',
      'keyframes': [
        { 'time': 0, 'value': 'positive(0.5)' },
        { 'time': 1, 'value': 'positive(0.5)' }
      ]}
    ]},

    {
    'animationId': 'an_gobo8',
    'duration': 6,
    'name': '',
    'timeline': [{
      'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo8' },
        { 'time': 1, 'value': 'gobo8' }
      ]
    }]},

    {
    'animationId': 'an_gobo8_shake',
    'duration': 6,
    'name': '',
    'timeline': [
      {'name': 'gobo',
      'keyframes': [
        { 'time': 0, 'value': 'gobo8' },
        { 'time': 1, 'value': 'gobo8' }
      ]},
      {'name': 'goboRotation',
      'keyframes': [
        { 'time': 0, 'value': 'positive(0.5)' },
        { 'time': 1, 'value': 'positive(0.5)' }
      ]}
    ]},

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
    'animationId': 'an_fog',
    'duration': 8,
    'name': '',
    'timeline': [
      { 'name': 'pump',
      'keyframes': [
        { 'time': 0, 'value': 255 },
        { 'time': 1, 'value': 255 }
      ]},
      { 'name': 'fan',
      'keyframes': [
        { 'time': 0, 'value': 255 },
        { 'time': 1, 'value': 255 }
      ]}
  ]},
  ],





/****************************************************************************

  Scenes

*/

  'scenes': [
    // {
    //   'sceneId': 'test_movinghead_mx50',
    //   'name': '',
    //   'active': 'loop',
    //   'midi': {
    //     'controllerId': 'korgnanopad2',
    //     'partId': 'button1'
    //   },
    //   'layers': [{
    //     'layerId': 'layer1',
    //     'devices': ['stairville_mx50_1', 'stairville_mx50_2', 'stairville_mx50_3', 'stairville_mx50_4', 'stairville_mx50_5', 'stairville_mx50_6'],
    //     'animations': [{
    //       'start': 0,
    //       'animationId': 'an_shutter_open'
    //     }]
    //   }]
    // },

    {
      'sceneId': 'intro',
      'name': '',
      'active': false,
      'midi': { 'controllerId': 'korgnanopad2', 'partId': 'button1' },
      'layers': [
        {'layerId': 'layer1',
        'devices': ['stairville_mx50_1', 'stairville_mx50_2', 'stairville_mx50_3', 'stairville_mx50_4', 'stairville_mx50_5', 'stairville_mx50_6'],
        'animations': [
          { 'start': 0, 'animationId': 'an_gobo4_shake' },
        ]}
    ]},

    {
      'sceneId': 'intro2',
      'name': '',
      'active': false,
      'midi': { 'controllerId': 'korgnanopad2', 'partId': 'button3' },
      'layers': [
        {'layerId': 'layer1',
        'devices': ['stairville_mx50_1', 'stairville_mx50_2', 'stairville_mx50_3', 'stairville_mx50_4'],
        'animations': [
          { 'start': 0, 'animationId': 'an_gobo5_shake' }
        ]},
        {'layerId': 'layer2',
        'devices': ['stairville_mx50_5', 'stairville_mx50_6'],
        'animations': [
          { 'start': 0, 'animationId': 'an_gobo6_shake' }
        ]}
    ]},

    {
      'sceneId': 'strobe',
      'name': '',
      'active': false,
      'midi': { 'controllerId': 'korgnanopad2', 'partId': 'button4' },
      'layers': [
        {'layerId': 'layer1',
        'devices': ['stairville_mx50_1', 'stairville_mx50_2', 'stairville_mx50_3', 'stairville_mx50_4', 'stairville_mx50_5', 'stairville_mx50_6'],
        'animations': [
          { 'start': 0, 'animationId': 'an_strobe_fast' },
          { 'start': 0, 'animationId': 'an_strobe_fast' }
        ]}
    ]},



],






  'devices': {
    'dmx': [
      // {
      //   'deviceId': 'fogmaschine',
      //   'type': 'InvolightStratus700',
      //   'name': 'InvolightStratus700',
      //   'universe': 1,
      //   'address': 120
      // },
      {
        'deviceId': 'stairville_mx50_1',
        'type': 'StairvilleMhX50LedSpotMovingHead',
        'name': 'Stairville MH-X50 LED Spot Moving Head',
        'universe': 1,
        'address': 1
      },
      {
        'deviceId': 'stairville_mx50_2',
        'type': 'StairvilleMhX50LedSpotMovingHead',
        'name': 'Stairville MH-X50 LED Spot Moving Head',
        'universe': 1,
        'address': 20
      },
      {
        'deviceId': 'stairville_mx50_3',
        'type': 'StairvilleMhX50LedSpotMovingHead',
        'name': 'Stairville MH-X50 LED Spot Moving Head',
        'universe': 1,
        'address': 40
      },
      {
        'deviceId': 'stairville_mx50_4',
        'type': 'StairvilleMhX50LedSpotMovingHead',
        'name': 'Stairville MH-X50 LED Spot Moving Head',
        'universe': 1,
        'address': 60
      },
      {
        'deviceId': 'stairville_mx50_5',
        'type': 'StairvilleMhX50LedSpotMovingHead',
        'name': 'Stairville MH-X50 LED Spot Moving Head',
        'universe': 1,
        'address': 80
      },
      {
        'deviceId': 'stairville_mx50_6',
        'type': 'StairvilleMhX50LedSpotMovingHead',
        'name': 'Stairville MH-X50 LED Spot Moving Head',
        'universe': 1,
        'address': 100
      }
      ],
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
