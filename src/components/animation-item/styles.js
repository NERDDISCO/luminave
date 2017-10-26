export const styles = `

*, *::before, *::after {
  box-sizing: border-box;
}

.keyframe {
  --speed: 0.125s;
  position: relative;
  z-index: 2;
  width: calc((var(--end) - var(--start)) * 100%);
  box-shadow: inset 0 0 0 1px;
  cursor: pointer;
  background: var(--background);
  color: var(--color);
}

.keyframe.active {
  background: var(--background-lighter);
  color: var(--color-darker);
}


.keyframe-label {
  position: absolute;
  top: 50%;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: var(--background-darker);
  box-shadow: inset 0 0 0 1px;
  transition: border-radius 0.25s var(--delay-radius, calc(var(--speed) * 2)) ease-in-out;
}

.keyframe-value {
  position: absolute;
  top: 50%;
  left: 1em;
  padding: 0.5em;
  max-width: 50%;
  line-height: 1;
  transform: translate3d(0, -50%, 0);
  opacity: 0;
  overflow: hidden;
  transition:
    opacity var(--speed) var(--speed) ease-in-out,
    max-width var(--speed) var(--delay-width, 0s) ease-in-out;
  transform-origin: 0 0;
  background: var(--background-darker);
  box-shadow: inset -1px 0 0 0, inset 0 -1px 0 0, inset 0 1px 0 0;
}

.keyframe-label:hover {
  border-radius: 50% 0 0 50%;
  --delay-radius: 0s;
}

.keyframe-label:hover .keyframe-value {
  max-width: 200px;
  opacity: 1;
  --delay-width: calc(var(--speed) * 2);
}

.animation-timeline {
  position: relative;
  display: flex;
  height: 3em;
  width: calc(var(--duration) / var(--loop-measures) * (100% - 10em));
}

.animation-label {
  width: 10em;
  padding: 0.25em;
  background: var(--background-lighter);
}

.animation {
  display: flex;
  margin: 0.25em 0;
  background: var(--background-darker);
  color: var(--color-lighter);
}

`
