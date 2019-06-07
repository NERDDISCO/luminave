import { createSelector } from 'reselect/src/index.js'
import { collator } from '../utils/index.js'

export const getLuminaveServer = state => state.luminaveServer
export const getLuminaveServerUrl = state => state.luminaveServer.url
export const getLuminaveServerReconnect = state => state.luminaveServer.reconnect
export const getLuminaveServerConnected = state => state.luminaveServer.connected
export const getLuminaveServerAnimation = state => state.luminaveServer.animationId
export const getLuminaveServerThorium = state => state.luminaveServer.thorium
export const getLuminaveServerThoriumScenes = state => state.luminaveServer.thorium.scenes

// /**
//  * 
//  */
// export const getMyStateSorted = createSelector(
//   getMyState,
//   myState => myState.sort((a, b) => collator.compare(a.myVariable, b.myVariable))
// )
