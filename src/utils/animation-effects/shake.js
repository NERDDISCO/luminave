/**
 * Shake with random steps
 * 
 * @param {Object} args -
 * @param {number} args.baseStrength - The base strength of the shake, higher value means more shakes
 * @param {number} args.actionStrength - Change the baseStrength with a strength that is specific to a certain action
 * @param {number} args.dimmer - The dimmer
 * @param {number[]} args.color - The RGB color
 */
export const shake = ({ baseStrength, actionStrength, dimmer, color }) => {
  const keyframes = {}

  // Defines the number of steps, higher value means faster changes
  const steps = baseStrength * actionStrength

  for (let step = 0; step <= steps; step++) {
    const _step = (1 / steps * step).toFixed(2)

    keyframes[_step] = {}
    keyframes[_step].dimmer = Math.floor(Math.random() * dimmer) + 0

    // First step
    if (step === 0) {
      keyframes[_step].color = color
    }

    // Last step
    if (step === steps) {
      keyframes[_step].color = color
    }
    
  }

  return keyframes
}
