import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'

/*
 * Show colors in a grid
 *
 * @TODO: Move the label (borth column and row) into their own modules and make them configurable
 * @TODO: Fix the performance
 */
class ColorGrid extends LitElement {
  static get properties() {
    return {
      rows: { type: Number },
      colors: { type: Array }
    }
  }

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeGridVars(rows) {
    const vars = { '--rows': rows }

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
   * Convert simple array of colors into Array of Objects which can be used by dom-repeat
   *
   * @TODO This is called over and over again
   */
  _toColorArray(colors) {
    const colorChunks = []
    let i = 0

    while (i < colors.length) {
      const chunk = { color: colors.slice(i, i + 3) }
      colorChunks.push(chunk)
      i += 3
    }

    return colorChunks
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

  render() {
    const { rows, colors } = this

    return html`
      <style>
        .container {
          display: grid;
          grid-template-rows: repeat(var(--rows), auto);
          grid-auto-flow: column;
          column-gap: 0;
          row-gap: calc(var(--padding-basic) / 2);

          counter-reset: header;
        }

        .container.left {
          float: left;
        }

        .container.right {
          float: right;
        }

        .row-label {
          height: 25px;
          width: 35px;
          font-size: .9em;
        }

        .item {
          position: relative;
          background: rgb( var(--red), var(--green), var(--blue));
          height: 25px;
          width: 40px;
        }

        .item:nth-child(4n-3):before {
          counter-increment: header;
          content: counter(header);
          position: absolute;
          top: calc(var(--padding-basic) * -6);
          overflow: visible;
          background: var(--background-dark);
          color: var(--color-light);
          padding: var(--padding-basic);
          font-size: .7em;
        }

        .label {
          font-size: .7em;
          padding: 0 0 0 calc(var(--padding-basic) / 2);
          background: var(--background-dark);
          color: var(--color-light);
          height: 100%;
          min-width: 20px;
          display: inline-block;
          vertical-align: top;
        }
      </style>

      <div class="container left" style="${this.computeGridVars(rows)}">
          <div class="row-label">
            <span class="label">a</span>
          </div>

          <div class="row-label">
            <span class="label">b</span>
          </div>

          <div class="row-label">
            <span class="label">c</span>
          </div>

          <div class="row-label">
            <span class="label">d</span>
          </div>
      </div>

      <div class="container" style="${this.computeGridVars(rows)}">

        ${repeat(this._toColorArray(colors), element => element, (element, index) => html`

          <div class="item" style="${this.computeItemVars(element.color)}">
            <span class="label">${this.computeLabel(index)}</span>
          </div>

        `)}

      </div>
    `
  }

}

customElements.define('color-grid', ColorGrid)
