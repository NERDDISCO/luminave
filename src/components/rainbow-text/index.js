import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

/*
 * Create a rainbow effect for any given text
 */
class RainbowText extends PolymerElement {

  static get properties() {
    return {
      text: String,
      duration: {
        type: String,
        value: '12s'
      },
      rainbowChars: {
        type: Array,
        computed: 'computeText(text)'
      }
    }
  }

  computeText(text) {
    return text.split('')
  }

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeVars(duration, rainbowChars, index) {
    const vars = {
      '--length': rainbowChars.length,
      '--delay': index,
      '--duration': duration
    }

    return Object.keys(vars).map(key => [key, vars[key]].join(':')).join(';')
  }

  static get template() {
    return `
      <style>
        :root {
          --duration: 1s;
          --length: 0;
          --delay: 0;
        }

        div {
          width: 100%;
          height: var(--height);
        }

        @keyframes rainbow {
          0% {
            color: #35c9a4
          }
          25% {
            color: #da4453
          }
          50% {
            color: #ffce54
          }
          75% {
            color: #3caee5
          }
          100% {
            color: #35c9a4
          }
        }

        span {
          animation: rainbow linear var(--duration) infinite backwards calc(var(--duration) / var(--length) * (var(--length) - var(--delay)) * -1)
        }


      </style>

      <template is="dom-repeat" items={{rainbowChars}} as="char"><span style="{{computeVars(duration, rainbowChars, index)}}">[[char]]</span></template>
    `
  }
}

customElements.define('rainbow-text', RainbowText)
