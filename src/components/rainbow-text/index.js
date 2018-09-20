import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'

/*
 * Create a rainbow effect for any given text
 */
class RainbowText extends LitElement {

  constructor() {
    super()

    this.duration = '12s'
  }

  static get properties() {
    return {
      text: { type: String },
      duration: { type: String }
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

  render() {
    const { text, duration } = this

    const rainbowChars = this.computeText(text)

    return html`
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

      ${repeat(rainbowChars, char => char, (char, index) => html`<span style="${this.computeVars(duration, rainbowChars, index)}">${char}</span>`)}
    `
  }
}

customElements.define('rainbow-text', RainbowText)
