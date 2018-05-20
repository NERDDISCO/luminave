import { uuid } from '/libs/abcq/uuid.js'

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
export const SET_CHANNEL = uuid()
export const SET_CHANNELS = uuid()
export const GET_CHANNEL = uuid()
export const SET_BPM = uuid()
export const SET_LIVE = uuid()
export const CONNECT_USB = uuid()
export const CONNECT_BLUETOOTH = uuid()
export const ADD_UNIVERSE = uuid()
export const REMOVE_UNIVERSE = uuid()
export const DEMO_UNIVERSE = uuid()
export const ADD_SCENE = uuid()
export const RUN_SCENE = uuid()
export const REMOVE_SCENE = uuid()
export const SET_SCENE_NAME = uuid()
export const ADD_ANIMATION_TO_SCENE = uuid()
export const REMOVE_ANIMATION_FROM_SCENE = uuid()
export const ADD_FIXTURE_TO_SCENE = uuid()
export const REMOVE_FIXTURE_FROM_SCENE = uuid()
export const ADD_ANIMATION = uuid()
export const RUN_ANIMATION = uuid()
export const REMOVE_ANIMATION = uuid()
export const SET_ANIMATION_NAME = uuid()
export const ADD_KEYFRAME = uuid()
export const ADD_FIXTURE = uuid()
export const SET_FIXTURE_PROPERTIES = uuid()
export const SET_ALL_FIXTURE_PROPERTIES = uuid()
export const RESET_FIXTURE_PROPERTIES = uuid()
export const REMOVE_FIXTURE = uuid()
export const ENABLE_MIDI = uuid()
export const ADD_MIDI = uuid()
export const REMOVE_MIDI = uuid()
export const ADD_MIDI_MAPPING = uuid()
export const SET_MIDI_MAPPING_ACTIVE = uuid()
export const LEARN_MIDI = uuid()
export const ADD_SCENE_TO_MIDI = uuid()
export const REMOVE_SCENE_FROM_MIDI = uuid()
export const ADD_SCENE_TO_TIMELINE = uuid()
export const REMOVE_SCENE_FROM_TIMELINE = uuid()
export const PLAY_TIMELINE = uuid()
export const RESET_TIMELINE = uuid()
export const SET_TIMELINE_PROGRESS = uuid()
export const SEND_UNIVERSE_TO_USB = uuid()
export const SET_MODV_COLOR = uuid()
export const CONNECT_MODV = uuid()
export const CONNECT_DEKK = uuid()
export const SET_DEKK_DATA = uuid()
export const CONNECT_FIVETWELVE = uuid()
export const SEND_UNIVERSE_TO_FIVETWELVE = uuid()

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
  'StairvilleOutdoorStageParTri']

export const FIXTURE_PROPERTIES = ['color', 'dimmer', 'strobe', 'white',
  'yellow', 'uv', 'rotate', 'pan', 'tilt', 'speed', 'brightness', 'colorSpeed',
  'movement', 'gobo', 'amount', 'mode', 'modvColor', 'colors', 'pattern', 'zoom',
  'xAxisRolling', 'yAxisRolling', 'zAxisRolling', 'xAxisMoving', 'yAxisMoving',
  'panTilt', 'panEndless', 'tiltEndless', 'sound', 'colorMacro', 'strobeMacro',
  'scanSpeed', 'rgbwMacro', 'resetAuto']
