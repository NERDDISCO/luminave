/**
 * Fade from startDimmer to endDimmer using the definec color
 * 
 * @param {Object} args -
 * @param {number} args.startDimmer - The original dimmer for the fade
 * @param {number} args.endDimmer - The dimmer to fade to
 * @param {number[]} args.color - The RGB color to fade to
 */
export const fade = ({ startDimmer, endDimmer, color }) => {
  const keyframes = {
    0: {
      dimmer: startDimmer,
      color
    },
    1: {
      dimmer: endDimmer,
      color
    }
  }

  return keyframes
}
