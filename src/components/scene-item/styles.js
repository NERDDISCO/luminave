export const styles = `

:host {
  display: block;
}
*, *::before, *::after {
  box-sizing: border-box;
}

.bar {
  position: relative;
  flex: 1;
}

.scene {
  opacity: 0.4;
}

.scene.active {
  opacity: 1;
}

.scene-label {
  padding: .25em .25em .25em .5em;
  display: flex;
  align-items: center;
  align-content: center;
  align-self: flex-start;
  background: var(--focus-background)
}

`
