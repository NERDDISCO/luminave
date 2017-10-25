export const styles = `

*, *::before, *::after {
  box-sizing: border-box;
}

.keyframe {
  position: absolute;
  z-index: 2;
  top: 50%;
  bottom: 0;
  left: calc(var(--start) * 100%);
  height: 1.5em;
  width: calc((var(--end) - var(--start)) * 100%);
  transform: translate(0, -50%);
  box-shadow: inset 0 0 0 1px;
  cursor: pointer;
  background: var(--background);
  color: var(--color);
}

.keyframe.active {
  background: var(--background-lighter);
  color: var(--color-darker);
}

.keyframe:hover {
  z-index: 4;
}

.animation-timeline {
  position: relative;
  display: flex;
  height: 1.5em;
  width: calc(var(--duration) / var(--loop-measures) * (100% - 10em));
}

.animation-label {
  width: 10em;
  padding: 0.25em;
}

.animation {
  display: flex;
  margin: 0.25em 0;
  background: var(--background-darker);
  color: var(--color-lighter);
}

`
