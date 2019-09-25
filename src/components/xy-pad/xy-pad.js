/**
 * XY Pad
 *
 * Can be used to select a x / y coordinate in a 2D system
 * 
 * Converted from a modV component (written in Vue by Sam Wray) into a Web Component using LitElement as the base class. 
 *
 * 2019 by Tim Pietrusky
 */

import {
  LitElement,
  html,
  css
} from 'lit-element'

/**
 * @TODO: Set position of 0 / 0 instead of asuming it should always start in the top left
 */
class XYPad extends LitElement {
  static get properties() {
    return {
      width: Number,
      height: Number,
      currentX: Number,
      currentY: Number,
      maxX: Number,
      maxY: Number,
      realX: Number,
      realY: Number,
      labelX: String,
      labelY: String,
      hideinputs: { type: Boolean }
    }
  }

  constructor() {
    super()

    this.context = undefined
    this.mousePressed = false
    
    this.labelX = 'x'
    this.labelY = 'y'
    this.hideinputs = false
  }

  static get styles() {
    return css`
      :host {
        --position-color: #ffa600;
        --position-line-width: 1;
        --position-radius: 10;
        --grid-sections: 30;
        --grid-color: #aaa;
        --grid-line-width: 1;
      }

      .pad {
        background: var(--pad-background, #333);
        cursor: crosshair;
      }

      .coordinate {
        width: var(--coordinate-width, 4em);
        height: var(--coordinate-height, auto);
      }
    `
  }

  templatePad(width, height) {
    return html`
      <canvas
        class="pad"
        id="pad"
        width="${width}"
        height="${height}"
        @click="${e => this.click(e)}"
        @mousedown="${e => this.mouseDown(e)}""
        @touchstart="${e => this.touchStart(e)}""
      ></canvas>
    `
  }

  templateInputs(x, y) {
    const { labelX, labelY } = this
    
    return html`
      <label for="x" class="coordinate-label">${labelX}</label>
      <input 
        class="coordinate" 
        type="number" 
        step="0.01" 
        name="x" 
        .value="${x}"
        @change=${(e) => this.updateX(e)}
      />
      <label for="y" class="coordinate-label">${labelY}</label>
      <input 
        class="coordinate" 
        type="number" 
        step="0.01" 
        name="y" 
        .value="${y}" 
        @change=${(e) => this.updateY(e)}
      />
    `
  }
  

  firstUpdated() {
    this._canvas = this.shadowRoot.querySelector('#pad')
    this._context = this._canvas.getContext('2d')

    this.currentX =
      this.currentX === undefined ? this.width / 2 : this.currentX
    this.currentY =
      this.currentY === undefined ? this.height / 2 : this.currentY
    
    this.cssVariables()
    
    if (this.maxX === undefined) {
      this.maxX = this.width
    }
    
    if (this.maxY === undefined) {
      this.maxY = this.height
    }
    
    this.calculateRealCoordinates()

    this.draw(this.currentX, this.currentY)
  }
  
  /**
   * Get variables out of CSS to change the style of the grid and the position
   */
  cssVariables() {
    const elementStyle = getComputedStyle(this)
    
    this._positionColor = elementStyle.getPropertyValue('--position-color')
    this._positionLineWidth = elementStyle.getPropertyValue('--position-line-width')
    this._positionRadius = elementStyle.getPropertyValue('--position-radius')
    
    this._gridSections = elementStyle.getPropertyValue('--grid-sections')
    this._gridColor = elementStyle.getPropertyValue('--grid-color')
    this._gridLineWidth = elementStyle.getPropertyValue('--grid-line-width')
  }

  mouseDown() {
    this.mousePressed = true

    window.addEventListener('mousemove', this.mouseMove.bind(this))
    window.addEventListener('mouseup', this.mouseUp.bind(this))
    window.addEventListener('touchmove', this.touchMove.bind(this))
    window.addEventListener('touchEnd', this.touchEnd.bind(this))
  }

  mouseUp() {
    this.mousePressed = false
    
    window.removeEventListener('mousemove', this.mouseMove.bind(this))
    window.removeEventListener('mouseup', this.mouseUp.bind(this))
    window.removeEventListener('touchmove', this.touchMove.bind(this))
    window.removeEventListener('touchEnd', this.touchEnd.bind(this))
  }

  mouseMove(e) {
    if (!this.mousePressed) return
    this.calculateValues(e)
  }

  touchStart() {
    this.mousePressed = true
  }

  touchMove(e) {
    if (!this.mousePressed) { 
      return 
    }
    this.calculateValues(e)
  }

  touchEnd() {
    this.mousePressed = false
  }

  click(e) {
    this.calculateValues(e, true)
  }
  
  updateX(e) {
    this.currentX = e.target.value
  }
  
  updateY(e) {
    this.currentY = e.target.value
  }
  
  calculateRealCoordinates() {
    this.realX = this.currentX * this.maxX / this.width
    this.realY = this.currentY * this.maxY / this.height
  }

  calculateValues(e, clicked = false) {
    const rect = this._canvas.getBoundingClientRect()

    let clientX

    if ('clientX' in e) {
      clientX = e.clientX
    } else {
      e.preventDefault()
      clientX = e.targetTouches[0].clientX
    }

    let clientY

    if ('clientY' in e) {
      clientY = e.clientY
    } else {
      clientY = e.targetTouches[0].clientY
    }

    let x = clientX - Math.round(rect.left)
    let y = clientY - Math.round(rect.top)
    
    // Don't allow values above or under the width / height of the canvas
    x = x > this.width ? this.width : x
    x = x < 0 ? 0 : x
    y = y > this.height ? this.height : y
    y = y < 0 ? 0 : y

    if (this.mousePressed || clicked) {
      // Only update when the values actually changed
      if (this.currentX !== x || this.currentY !== y) {
        this.currentX = x
        this.currentY = y
        
        this.calculateRealCoordinates()
      }
    }
    
    // Trigger a changed event when the values are selected
    if (!this.mousePressed) {
      const { realX, realY } = this

      this.dispatchEvent(new CustomEvent('changed', {
        detail: {
           realX,
           realY
        }
      }))
    }
  }

  draw(x, y) {
    if (this._canvas === undefined) {
      return
    }

    const canvas = this._canvas
    const context = this._context

    context.clearRect(0, 0, canvas.width, canvas.height)

    this.drawGrid()
    this.drawPosition(Math.round(x) + 0.5, Math.round(y) + 0.5)
  }

  drawGrid() {
    const canvas = this._canvas
    const context = this._context
    const { width, height } = canvas

    context.save()
    context.strokeStyle = this._gridColor
    context.beginPath()
    context.lineWidth = this._gridLineWidth || 1
    const sections = this._gridSections || 16
    const step = width / sections

    for (let i = 1; i < sections; i += 1) {
      context.moveTo(Math.round(i * step) + 0.5, 0)
      context.lineTo(Math.round(i * step) + 0.5, height)
      context.moveTo(0, Math.round(i * step) + 0.5)
      context.lineTo(width, Math.round(i * step) + 0.5)
    }
    context.stroke()
    context.restore()
  }

  drawPosition(x, y) {
    const canvas = this._canvas
    const context = this._context
    const { width, height } = canvas

    context.lineWidth = this._positionLineWidth || 1
    context.strokeStyle = this._positionColor

    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, height)
    context.stroke()

    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(width, y)
    context.stroke()

    context.beginPath()
    context.arc(x, y, this._positionRadius, 0, 2 * Math.PI, true)
    context.stroke()
  }

  render() {
    const { width, height, currentX, currentY, realX, realY, hideinputs } = this
    
    const pad = this.templatePad(width, height)
    const inputs = hideinputs 
      ? html``
      : this.templateInputs(realX, realY)
    
    this.draw(currentX, currentY)

    return html`
      ${pad}
      <br />
      ${inputs}
    `
  }
}

customElements.define('xy-pad', XYPad)
