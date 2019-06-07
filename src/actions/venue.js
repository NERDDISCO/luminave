import * as constants from '../constants/index.js'
import * as selectors from '../selectors/index.js'
import * as utils from '../utils/index.js'

/*
 * Add a venue
 */
export const addVenue = venue => ({
  venue,
  type: constants.ADD_VENUE
})

/*
 * Set the values of a venue
 */
export const setVenue = (venueId, venue) => ({
  venueId,
  venue,
  type: constants.SET_VENUE
})

/*
 * Remove a venue
 */
export const removeVenue = venueId => ({
  venueId,
  type: constants.REMOVE_VENUE
})

/*
 * Add a new slot to the slots of a venue
 */
export const addVenueSlot = (venueId, slot) => ({
  venueId,
  slot,
  type: constants.ADD_VENUE_SLOT
})

/*
 * Set the values of a slot
 */
export const setVenueSlot = (venueId, slot) => ({
  venueId,
  slot,
  type: constants.SET_VENUE_SLOT
})

/*
 * Set the values of a slot
 */
export const removeVenueSlot = (venueId, slot) => ({
  venueId,
  slot,
  type: constants.REMOVE_VENUE_SLOT
})

