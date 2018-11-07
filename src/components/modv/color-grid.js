import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { classMap } from '/node_modules/lit-html/directives/classMap.js'
import '/node_modules/@polymer/paper-tooltip/paper-tooltip.js'
import { collator } from '../../utils/index.js'

/*
 * Show colors in a grid
 *
 * @TODO: Fix the performance
 */
class ModvColorGrid extends LitElement {

  constructor() {
    super()

    this.alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 97))
  }

  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      colors: { type: Array },
      slots: { type: Array }
    }
  }

  computeLabelVars(height) {
    const vars = { '--rows': height }

    return Object.keys(vars).map(key => [key, vars[key]].join(':'))
      .join(';')
  }

  computeColorVars(width, height) {
    const vars = { 
      '--rows': height,
      '--columns': width
    }

    return Object.keys(vars).map(key => [key, vars[key]].join(':'))
      .join(';')
  }

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeItemVars(color) {
    const vars = {
      '--red': color[0],
      '--green': color[1],
      '--blue': color[2]
    }

    return Object.keys(vars).map(key => [key, vars[key]].join(':'))
      .join(';')
  }

  /*
   * Set the label of a color
   *
   * @TODO: This is executed over and over again because the array is regenerated with every frame
   */
  computeLabel(index) {
    const realIndex = index + 1

    return `${realIndex}`
  }

  _getLabel(index) {
    return 'A'.charCodeAt(index)
  }

  render() {
    const { width, height, alphabet, slots } = this
    let { colors } = this

    const labels = []

    if (colors.length === 0) {
      colors = new Array(width * height * 3).fill(0)

      colors[0] = 255
      colors[3] = 255
      colors[4] = 255
    }

    const colorChunks = []
    let colorIndex = 0
    let modvIndex = 0
    let slotItems = []

    for (let x = 0; x < width; x++) {
      labels.push(alphabet[x])

      for (let y = 0; y < height; y++) {
        modvIndex++

        const chunk = { 
          color: colors.slice(colorIndex, colorIndex + 3),
          modvIndex,
          mappedSlots: false,
          slots: ''
        }

        // Show meta information for slots that are assigned to a specific modV color index
        if (slots.length > 0) {
          slotItems = slots.filter(slot => slot.modv === modvIndex)

          if (slotItems.length > 0) {
            slotItems = slotItems.sort((a, b) => collator.compare(a.name, b.name))

            chunk.mappedSlots = true
            chunk.slots = slotItems
          }
        }

        colorChunks.push(chunk)
        colorIndex += 3
      }
    }

    return html`
      <style>
        .container {
          display: flex;
        }

        .container-label {
          --columns: 1;
          display: grid;
          grid-template-columns: repeat(var(--columns), 1fr);
          grid-template-rows: repeat(var(--rows), 1fr);
          grid-gap: 10px;
        }

        .container-color {
          display: grid;
          grid-template-columns: repeat(var(--columns), 1fr);
          grid-template-rows: repeat(var(--rows), 1fr);
          grid-gap: 10px;
          grid-auto-flow: column;
          
          counter-reset: header;
        }

        .item {
          background: rgb(var(--red), var(--green), var(--blue));
          height: 25px;
          width: 40px;
        }

        .item:focus {
          border: 1px solid #f00;
        }

        .item.mappedSlots {
          box-shadow: 0 0 0 2px var(--mdc-theme-secondary);

        }

        .header {
          position: relative;
        }

        .header:before {
          counter-increment: header;
          content: counter(header);
          position: absolute;
          top: -100%;
          width: 100%;
          text-align: center;
        }

        .row-label {
          height: 25px;
          width: 35px;
          font-size: .9em;
          display: inline;
        }
        
        .label {
          font-size: .7em;
          padding: 0 0 0 calc(var(--padding-basic) / 2);
          background: var(--dark-primary-color);
          color: var(--text-primary-color);
          height: 100%;
          min-width: 20px;
          display: inline-block;
          vertical-align: top;
        }
      </style>

      <custom-style>
        <style>
          paper-tooltip ul {
            margin: 0;
            padding: 0 1em;
            display: block;
            width: 100%;
          }
        </style>
      </custom-style>

      <div class="container">
        
        <div class="container-label" style="${this.computeLabelVars(height)}">
          ${repeat(labels, label => html`
            <div class="row-label">
              <span>${label}</span>
            </div>
          `)}
        </div>

        <div class="container-color" style="${this.computeColorVars(width, height)}">
          ${repeat(colorChunks, element => element, (element, index) => html`

            <div class="item 
              ${classMap({ 
                header: index % height === 0, 
                mappedSlots: element.mappedSlots 
              })}" 
              style="${this.computeItemVars(element.color)}" 
              tabindex="0">

              <span class="label">${this.computeLabel(index)}</span>
              
              ${
                element.mappedSlots 
                ? html`
                  <paper-tooltip animation-delay="0">
                    <ul>
                    ${repeat(element.slots, slot => html`
                      <li>${slot.name}</li>
                    `)}
                    </ul>
                  </paper-tooltip>
                `
                : ''
              }
            </div>

          `)}
        </div>
        
      </div>

    `
  }

}

customElements.define('modv-color-grid', ModvColorGrid)
