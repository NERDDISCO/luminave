import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

/*
 * Show colors in a grid
 */
class ColorGrid extends PolymerElement {
  static get properties() {
    return {
      width: Number,
      height: Number,
      colors: Array
    }
  }

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeGridVars(width) {
    const vars = { '--width': width }

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
   */
  _toColorArray(colors) {
    const colorChunks = []
    let i = 0

    while (i < colors.length) {
      const chunk = {
        color: colors.slice(i, i + 3)
      }

      colorChunks.push(chunk)

      i += 3
    }

    return colorChunks
  }

  computeLabel(index) {
    return index + 1
  }

  static get template() {
    return `
      <style>
        .container {
          display: grid;
          grid-template-rows: repeat(var(--width), auto);
          grid-auto-flow: column;
          column-gap: 0;
          row-gap: var(--padding-basic);
        }

        .item {
          background: rgb( var(--red), var(--green), var(--blue));
          height: 25px;
          width: 55px;
        }

        .label {
          font-size: .8em;
          padding: 0 0 0 calc(var(--padding-basic));
          background: var(--background-dark);
          color: var(--color-light);
          height: 100%;
          min-width: 20px;
          display: inline-block;
          vertical-align: top;
        }
      </style>

      <div class="container" style="{{computeGridVars(width)}}">

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
