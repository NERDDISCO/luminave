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

  static get template() {
    return `
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(var(--width), auto);
        }

        .item {
          background: rgb( var(--red), var(--green), var(--blue));
          min-height: 1.5em;
          border-right: 3px solid var(--background-dark);
          color: #000;
          text-align: center;
          overflow: hidden;
        }

        .container .item:first-child {
          margin: 0 0 0 var(--padding-basic);
        }

        .container .item:last-child {
          margin: 0 var(--padding-basic) 0 0;
        }
      </style>

      <div class="container" style="{{computeGridVars(width)}}">

        <template is="dom-repeat" items={{_toColorArray(colors)}} as="element">
          <div class="item" style="{{computeItemVars(element.color)}}"></div>
        </template>

      </div>
    `
  }

}

customElements.define('color-grid', ColorGrid)
