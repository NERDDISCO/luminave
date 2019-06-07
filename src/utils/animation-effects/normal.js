/**
 * Normal keyframes without any extras
 * 
 * @param {Object} args -
 * @param {number} args.dimmer - The dimmer
 * @param {number[]} args.color - The RGB color
 */
export const normal = ({ dimmer, color }) => {
  const keyframes = {
    0: { 
      dimmer,
      color
    },
    1: { 
      dimmer,
      color
    }
  }

  return keyframes
}
