export const batch = (new Array(512)).fill(0)

export const addToBatch = (channel, value) => {
  batch[channel] = value
}

export const clearBatch = () => {
  batch.splice(0, batch.length)
}

export const fixtureBatch = {}

export const addToFixtureBatch = (fixtureId, properties) => {
  fixtureBatch[fixtureId] = fixtureBatch[fixtureId] || { properties: {} }
  Object.assign(fixtureBatch[fixtureId].properties, properties)
}

export const clearFixtureBatch = () => {
  Object.keys(fixtureBatch).forEach(key => { delete fixtureBatch[key] })
}
