import { createSelector } from 'reselect/src/index.js'
import { collator } from '../utils/index.js'

export const getFivetwelve = state => state.fivetwelve
export const getFivetwelveUrl = state => state.fivetwelve.url
export const getFivetwelveReconnect = state => state.fivetwelve.reconnect
export const getFivetwelveConnected = state => state.fivetwelve.connected
