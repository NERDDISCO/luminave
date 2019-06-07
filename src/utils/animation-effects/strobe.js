/**
 * Strobe = Turn the lights on and off in a loop
 * 
 * @param {Object} args -
 * @param {number} args.baseStrength - The base strength of the strobe, higher value means faster strobe
 * @param {number} args.actionStrength - Change the baseStrength with a strength that is specific to a certain action
 * @param {number} args.dimmer - The dimmer
 * @param {number[]} args.color - The RGB color
 */
export const strobe = ({ baseStrength, actionStrength, dimmer, color }) => {
  const keyframes = {}

  // Defines the number of steps, higher value means faster changes
  const steps = baseStrength * actionStrength

  for (let step = 0; step <= steps; step++) {
    const _step = (1 / steps * step).toFixed(2)

    keyframes[_step] = {}
    keyframes[_step + 0.15] = {}

    keyframes[_step].dimmer = 
      step % 2 === 0 
        ? dimmer 
        : 0

    keyframes[_step + 0.15].dimmer = 
      step % 2 === 0 
        ? 0 
        : dimmer

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
