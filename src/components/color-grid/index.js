import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

/*
 * Show colors in a grid
 *
 * @TODO: Move the label (borth column and row) into their own modules and make them configurable
 * @TODO: Fix the performance
 */
class ColorGrid extends PolymerElement {
  static get properties() {
    return {
      rows: Number,
      colors: Array
    }
  }

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeGridVars(rows) {
    const vars = { '--rows': rows }

    return Object.keys(vars).map(key => [key, vars[key]].join(':')).join(';')
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

    return Object.keys(vars).map(key => [key, vars[key]].join(':')).join(';')
  }

  /*
   * Convert simple array of colors into Array of Objects which can be used by dom-repeat
   *
   * @TODO See if this is called over and over again when the colors are changing
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
   * @TODO: See if this is called over and over again when the colors are changing
   */
  computeLabel(index) {
    const realIndex = index + 1

    return `${realIndex}`
  }

  static get template() {
    return `
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

      <div class="container left" style="{{computeGridVars(rows)}}">
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

      <div class="container" style="{{computeGridVars(rows)}}">

        <template is="dom-repeat" items={{_toColorArray(colors)}} as="element">
          <div class="item" style="{{computeItemVars(element.color)}}">
            <span class="label">{{computeLabel(index)}}</span>
          </div>
        </template>

      </div>
    `
  }

}

customElements.define('color-grid', ColorGrid)
