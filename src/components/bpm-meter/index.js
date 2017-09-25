import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class BPMMeter extends PolymerElement {

  constructor() {
    super();
  }

  static get template() {
    return `
       <style>
        .meter {
          font-size: 2em;
          padding: 1em;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          font-family: monospace;
          background: var(--background);
          color: var(--color);
        }
      </style>
        <div class="meter">[[bpm]]</div>
    `
  }
}

customElements.define('bpm-meter', BPMMeter)
