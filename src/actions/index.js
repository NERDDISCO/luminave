import { SET_CHANNEL } from '../constants/index.js'

export const setChannel = (channel, value) => ({
  channel,
  value,
  type : SET_CHANNEL
})
