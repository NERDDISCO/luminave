import { createSelector } from 'reselect/src/index.js'

export const getVenues = state => state.venueManager

/*
 * Get a specific fixture by using the fixtureId
 */
export const getVenue = (state, properties) => {
  return getVenues(state)
    .filter(venue => venue.id === properties.venueId)[0]
}

/*
 * Sort venues by venue.name
 */
export const getVenuesSorted = createSelector(
  getVenues,
  venues => venues.sort((a, b) => collator.compare(a.name, b.name))
)

/*
 * Get venues that contain a specific fixture
 */
export const getVenuesWithFixture = (state, properties) => {
  return getVenues(state)
    .filter(venue => {
      return venue.slots.filter(slot => slot.fixtures.includes(properties.fixtureId))
    })
}

/*
 * Get venues that contain a specific animation
 */
export const getVenuesWithAnimation = (state, properties) => {
  return getVenues(state)
    .filter(venue => {
      return venue.slots.filter(slot => slot.animations.includes(properties.animationId))
    })
}

