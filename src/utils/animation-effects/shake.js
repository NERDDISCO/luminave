/**
 * Shake with random steps
 * 
 * @param {Object} args -
 * @param {number} args.baseStrength - The base strength of the shake, higher value means more shakes
 * @param {number} args.actionStrength - Change the baseStrength with a strength that is specific to a certain action
 * @param {number} args.dimmer - The dimmer
 * @param {number[]} args.color - The RGB color
 * @param {number[]} args.duration - The length of the shake animation
 */

 const FPS = 10

export const shake = ({ baseStrength, actionStrength, dimmer, color, duration }) => {
  const keyframes = {}

  // Defines the number of steps, higher value means faster changes
  // Multiply by the duration so we have at least 10 steps per second
  const steps = baseStrength * (duration / FPS) * actionStrength

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
