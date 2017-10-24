export const styles = `

*, *::before, *::after {
  box-sizing: border-box;
}

.timeline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.progress {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 10em;
  overflow: hidden;
}

.needle {
  --needle-color: #daf032;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 3;
  box-shadow: inset 2px 0 0 0 var(--needle-color);
  transform-origin: 0 0;
  transform: translateX(-1px) translate3d(calc(var(--progress) * 100%), 0, 0);
}

.step {
  position: relative;
  box-shadow: inset 0 0 0 1px;
  flex: 1;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  opacity: 0.1;
}

.step:hover {
  opacity: 0.8;
}


.grid {
  display: flex;
  position: absolute;
  top: 0;
  left: 10em;
  right: 0;
  bottom: 0;
}

`
