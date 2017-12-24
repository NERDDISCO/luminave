import { uuid } from '/libs/abcq/uuid.js'

/*
 *
 * A collection of constants which are used to:
 * - have a unique reference to every state in VisionLord
 * - access the localStorage
 * - define global lists
 */

/*
 * State
 */
export const SET_CHANNEL = uuid()
export const GET_CHANNEL = uuid()
export const SET_BPM = uuid()
export const CONNECT_USB = uuid()
export const CONNECT_BLUETOOTH = uuid()
export const ADD_UNIVERSE = uuid()
export const REMOVE_UNIVERSE = uuid()
export const DEMO_UNIVERSE = uuid()
export const ADD_SCENE = uuid()
export const RUN_SCENE = uuid()
export const REMOVE_SCENE = uuid()
export const ADD_ANIMATION_TO_SCENE = uuid()
export const ADD_FIXTURE_TO_SCENE = uuid()
export const ADD_ANIMATION = uuid()
export const RUN_ANIMATION = uuid()
export const REMOVE_ANIMATION = uuid()
export const ADD_KEYFRAME = uuid()
export const ADD_FIXTURE = uuid()
export const REMOVE_FIXTURE = uuid()

/*
 * localStorage
 */
export const STORAGE_STATE = 'VisionLordConfig'

/*
 * Global lists
 */
export const FIXTURE_TYPES = ['EuroliteTMH8', 'FunGenerationSeParQuadLedRgbUv',
  'AdjStarburst', 'CameoFlatPar1RGBW', 'CameoPixBar600PRO', 'CameoWookie200RGY',
  'StairvilleAF150', 'StairvilleBowlBeam604LEDCOBMovingHead']

export const FIXTURE_PROPERTIES = ['color', 'dimmer', 'strobe', 'white',
  'yellow', 'uv', 'rotate', 'pan', 'tilt', 'speed', 'brightness', 'colorSpeed',
  'movement', 'gobo', 'amount', 'mode', 'colors', 'pattern', 'zoom',
  'xAxisRolling', 'yAxisRolling', 'zAxisRolling', 'xAxisMoving', 'yAxisMoving',
  'panTilt', 'panEndless', 'tiltEndless']
