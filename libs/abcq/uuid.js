import Abcq from './index.js'
const generator = new Abcq()

export default generator
export const uuid = () => generator.generate()
