import { uuidV1 } from '/libs/uuid/uuid.js'

/*
 *
 * A collection of constants which are used to:
 * - have a unique reference to every state
 * - access the localStorage
 * - define global lists
 */

/*
 * State
 */
export const SET_CHANNEL = uuidV1()
export const SET_CHANNELS = uuidV1()
export const GET_CHANNEL = uuidV1()
export const SET_BPM = uuidV1()
export const SET_LIVE = uuidV1()
export const CONNECT_USB = uuidV1()
export const CONNECT_BLUETOOTH = uuidV1()
export const ADD_UNIVERSE = uuidV1()
export const REMOVE_UNIVERSE = uuidV1()
export const DEMO_UNIVERSE = uuidV1()
export const ADD_SCENE = uuidV1()
export const SET_SCENE = uuidV1()
export const RUN_SCENE = uuidV1()
export const REMOVE_SCENE = uuidV1()
export const SET_SCENE_NAME = uuidV1()
export const ADD_ANIMATION_TO_SCENE = uuidV1()
export const REMOVE_ANIMATION_FROM_SCENE = uuidV1()
export const ADD_FIXTURE_TO_SCENE = uuidV1()
export const REMOVE_FIXTURE_FROM_SCENE = uuidV1()
export const ADD_ANIMATION = uuidV1()
export const RUN_ANIMATION = uuidV1()
export const REMOVE_ANIMATION = uuidV1()
export const SET_ANIMATION = uuidV1()
export const SET_ANIMATION_NAME = uuidV1()
export const ADD_KEYFRAME = uuidV1()
export const ADD_KEYFRAMES = uuidV1()
export const ADD_FIXTURE = uuidV1()
export const SET_FIXTURE = uuidV1()
export const SET_FIXTURE_ADDRESS = uuidV1()
export const SET_FIXTURE_PROPERTIES = uuidV1()
export const SET_ALL_FIXTURE_PROPERTIES = uuidV1()
export const RESET_FIXTURE_PROPERTIES = uuidV1()
export const REMOVE_FIXTURE = uuidV1()
export const ENABLE_MIDI = uuidV1()
export const ADD_MIDI = uuidV1()
export const REMOVE_MIDI = uuidV1()
export const ADD_MIDI_MAPPING = uuidV1()
export const SET_MIDI_MAPPING_ACTIVE = uuidV1()
export const LEARN_MIDI = uuidV1()
export const ADD_SCENE_TO_MIDI = uuidV1()
export const ADD_SCENES_TO_MIDI = uuidV1()
export const REMOVE_SCENE_FROM_MIDI = uuidV1()
export const ADD_SCENE_TO_TIMELINE = uuidV1()
export const REMOVE_SCENE_FROM_TIMELINE = uuidV1()
export const PLAY_TIMELINE = uuidV1()
export const RESET_TIMELINE = uuidV1()
export const SET_TIMELINE_PROGRESS = uuidV1()
export const SEND_UNIVERSE_TO_USB = uuidV1()
export const SET_MODV_COLOR = uuidV1()
export const CONNECT_MODV = uuidV1()
export const CONNECT_DEKK = uuidV1()
export const SET_DEKK_DATA = uuidV1()
export const CONNECT_FIVETWELVE = uuidV1()
export const SEND_UNIVERSE_TO_FIVETWELVE = uuidV1()
export const ADD_VENUE = uuidV1()
export const SET_VENUE = uuidV1()
export const REMOVE_VENUE = uuidV1()
export const ADD_VENUE_SLOT = uuidV1()
export const SET_VENUE_SLOT = uuidV1()
export const REMOVE_VENUE_SLOT = uuidV1()

/*
 * localStorage
 */
export const STORAGE_STATE = 'LuminaveConfig'

/*
 * Global lists
 */
export const FIXTURE_TYPES = ['EuroliteTMH8', 'FunGenerationSeParQuadLedRgbUv',
  'AdjStarburst', 'CameoFlatPar1RGBW', 'CameoPixBar600PRO', 'CameoWookie200RGY',
  'StairvilleAF150', 'StairvilleBowlBeam604LEDCOBMovingHead', 'JsFestMovingHeadWash',
  'StairvilleOutdoorStageParTri', 'BasicColor', 'BasicFluter', 'EuroliteTMH7',
  'TourHazerII', 'SgmXC5', 'BasicDimmer', 'LTHLedParCob250w', 'AdjSweeperBeamQuadLed',
  'RobeColorWash575EAt1_4', 'ViperVl3000Spot', 'MacQuantumWash', 'MacAura'
]

export const FIXTURE_PROPERTIES = ['color', 'dimmer', 'strobe', 'white',
  'yellow', 'uv', 'rotate', 'pan', 'tilt', 'speed', 'brightness', 'colorSpeed',
  'movement', 'gobo', 'amount', 'mode', 'modvColor', 'colors', 'pattern', 'zoom',
  'xAxisRolling', 'yAxisRolling', 'zAxisRolling', 'xAxisMoving', 'yAxisMoving',
  'panTilt', 'panEndless', 'tiltEndless', 'sound', 'colorMacro', 'strobeMacro',
  'scanSpeed', 'rgbwMacro', 'resetAuto', 'pump', 'fan', 'strobeDuration', 'strobeRate',
  'white1', 'white2', 'white3', 'white4', 'white5', 'tiltMacro', 'tiltMacroSpeed', 
  'chase', 'chaseSpeed', 'panTiltMacro', 'panTiltMacroSpeed', 'goboRotating', 'goboWheelRotating',
  'goboRotation', 'prism', 'prismRotation', 'frost', 'iris', 'focus', 'intensity', 'edge', 'ctoMixer',
  'colorWheel', 'gobo1', 'gobo1Rotation', 'gobo2', 'gobo2Rotation', 'gobo3', 'gobo3Rotation',
  'beamIris', 'focusTime', 'colorTime', 'beamTime', 'goboTime', 'control', 'shutter', 'auraShutter',
  'auraDimmer', 'auraColor'
]

export const MIDI_TYPE_BUTTON = 'Button'
export const MIDI_TYPE_KNOB = 'Knob'
export const MIDI_TYPE_FADER = 'Fader'
export const MIDI_TYPE_EMPTY = 'Empty'
export const MIDI_TYPES = [MIDI_TYPE_BUTTON, MIDI_TYPE_KNOB, MIDI_TYPE_FADER, MIDI_TYPE_EMPTY]
