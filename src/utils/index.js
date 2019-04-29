export const batch = (new Array(512)).fill(0)

export const addToBatch = (channel, value) => {
  batch[channel] = value
}

export const clearBatch = () => {
  batch.fill(0)
}

export const fixtureBatch = {}

export const addToFixtureBatch = (fixtureId, properties) => {
  fixtureBatch[fixtureId] = fixtureBatch[fixtureId] || { properties: {} }
  Object.assign(fixtureBatch[fixtureId].properties, properties)
}

export const clearFixtureBatch = () => {
  Object.keys(fixtureBatch).forEach(key => { delete fixtureBatch[key] })
}

export const clearFixtureInBatch = fixtureId => {
  if (fixtureBatch[fixtureId] !== undefined) {
    Reflect.deleteProperty(fixtureBatch, fixtureId)
    // fixtureBatch[fixtureId].properties = {}
  }
}

export const modvData = {
  // Of all colors that is grabbed from Canvas we get the average
  average: [0, 0, 0],
  // An array of colors grabbed from specific points from the Canvas (configurable in modV)
  colors: [],
  // The amount of areas that are selected for x & y
  selectionX: 0,
  selectionY: 0
}

export const setModvData = data => {
  modvData.average = data.average
  modvData.colors = data.colors
  modvData.selectionX = data.selectionX
  modvData.selectionY = data.selectionY
}

/**
 * Collator used for a natural sort
 */
export const collator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base'
})

/**
 * Convert any number into a number with fixed precision
 * @param {Number} number - The number that should have fixed precision
 * @param {*} precision - The precision to convert to
 * @param {*} base - The base (default is 10)
 */
export const toFixedNumber = (number, precision, base = 10) => {
  var pow = Math.pow(base, precision)
  return Math.round(number * pow) / pow
}
