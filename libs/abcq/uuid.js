import Abcq from './index.js'
const generator = new Abcq()

export default generator
export const uuid = () => generator.generate()

// @TODO: Replace this with a real import when UUID becomes a ES6 module
export const uuidV1 = window.uuidv1
