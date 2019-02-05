import update from 'immutability-helper/index.js'
import {
  ADD_VENUE,
  SET_VENUE,
  REMOVE_VENUE,
  ADD_VENUE_SLOT,
  SET_VENUE_SLOT,
  REMOVE_VENUE_SLOT
} from '../constants/index.js'

/*
 * Handle the scenes
 */
const venueManager = (state = [], {
  type,
  venue,
  venueId,
  venueIndex,
  slot
}) => {

  // Get the position of the venue using the venueId
  if (venueId !== undefined) {
    venueIndex = state.findIndex(venue => venue.id === venueId)
  }

  switch (type) {
    case ADD_VENUE: {
      return update(state, { $push: [venue] })
    }

    case SET_VENUE: {
      return update(state, { [venueIndex]: { $merge: venue } })
    }

    case REMOVE_VENUE: {
      return update(state, { $splice: [[venueIndex, 1]] })
    }

    case ADD_VENUE_SLOT: {
      return update(state, { [venueIndex]: { slots: { $push: [slot] } } })
    }

    case SET_VENUE_SLOT: {
      const slotIndex = state[venueIndex].slots.findIndex(_slot => _slot.id === slot.id)

      return update(state, { [venueIndex]: { slots: { [slotIndex]: { $merge: slot } } } })
    }

    case REMOVE_VENUE_SLOT: {
      const slotIndex = state[venueIndex].slots.findIndex(_slot => _slot.id === slot.id)

      return update(state, { [venueIndex]: { slots: { $splice: [[slotIndex, 1]] } } })
    }

    default:
      return state
  }
}

export default venueManager
