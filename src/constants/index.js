import uuidv1 from 'uuid/v1.js'


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
export const SET_CHANNEL = uuidv1()
export const SET_CHANNELS = uuidv1()
export const GET_CHANNEL = uuidv1()
export const SET_BPM = uuidv1()
export const SET_LIVE = uuidv1()
export const CONNECT_USB = uuidv1()
export const CONNECT_BLUETOOTH = uuidv1()
export const ADD_UNIVERSE = uuidv1()
export const REMOVE_UNIVERSE = uuidv1()
export const DEMO_UNIVERSE = uuidv1()
export const ADD_SCENE = uuidv1()
export const SET_SCENE = uuidv1()
export const RUN_SCENE = uuidv1()
export const REMOVE_SCENE = uuidv1()
export const SET_SCENE_NAME = uuidv1()
export const ADD_ANIMATION_TO_SCENE = uuidv1()
export const REMOVE_ANIMATION_FROM_SCENE = uuidv1()
export const ADD_FIXTURE_TO_SCENE = uuidv1()
export const REMOVE_FIXTURE_FROM_SCENE = uuidv1()
export const ADD_ANIMATION = uuidv1()
export const RUN_ANIMATION = uuidv1()
export const REMOVE_ANIMATION = uuidv1()
export const SET_ANIMATION = uuidv1()
export const SET_ANIMATION_NAME = uuidv1()
export const ADD_KEYFRAME = uuidv1()
export const ADD_KEYFRAMES = uuidv1()
export const ADD_FIXTURE = uuidv1()
export const SET_FIXTURE = uuidv1()
export const SET_FIXTURE_ADDRESS = uuidv1()
export const SET_FIXTURE_PROPERTIES = uuidv1()
export const SET_ALL_FIXTURE_PROPERTIES = uuidv1()
export const RESET_FIXTURE_PROPERTIES = uuidv1()
export const REMOVE_FIXTURE = uuidv1()
export const ENABLE_MIDI = uuidv1()
export const ADD_MIDI = uuidv1()
export const REMOVE_MIDI = uuidv1()
export const ADD_MIDI_MAPPING = uuidv1()
export const SET_MIDI_MAPPING_ACTIVE = uuidv1()
export const LEARN_MIDI = uuidv1()
export const ADD_SCENE_TO_MIDI = uuidv1()
export const ADD_SCENES_TO_MIDI = uuidv1()
export const REMOVE_SCENE_FROM_MIDI = uuidv1()
export const ADD_SCENE_TO_TIMELINE = uuidv1()
export const REMOVE_SCENE_FROM_TIMELINE = uuidv1()
export const PLAY_TIMELINE = uuidv1()
export const RESET_TIMELINE = uuidv1()
export const SET_TIMELINE_PROGRESS = uuidv1()
export const SEND_UNIVERSE_TO_USB = uuidv1()
export const CONNECT_MODV = uuidv1()
export const CONNECT_DEKK = uuidv1()
export const SET_DEKK_DATA = uuidv1()
export const CONNECT_FIVETWELVE = uuidv1()
export const SEND_UNIVERSE_TO_FIVETWELVE = uuidv1()
export const ADD_VENUE = uuidv1()
export const SET_VENUE = uuidv1()
export const REMOVE_VENUE = uuidv1()
export const ADD_VENUE_SLOT = uuidv1()
export const SET_VENUE_SLOT = uuidv1()
export const REMOVE_VENUE_SLOT = uuidv1()

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
  'RobeColorWash575EAt1_4', 'ViperVl3000Spot', 'MacQuantumWash', 'MacAura', 'Rollapix100'
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
  'auraDimmer', 'auraColor', 'beamColor', 'beamDimmer', 'beamShutter'
]

export const MIDI_TYPE_BUTTON = 'Button'
export const MIDI_TYPE_KNOB = 'Knob'
export const MIDI_TYPE_FADER = 'Fader'
export const MIDI_TYPE_EMPTY = 'Empty'
export const MIDI_TYPES = [MIDI_TYPE_BUTTON, MIDI_TYPE_KNOB, MIDI_TYPE_FADER, MIDI_TYPE_EMPTY]
