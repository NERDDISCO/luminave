import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'

import app from './myApp.js'

import './components/my-view/index.js'

class MyApp extends app.ReduxMixin(PolymerElement) {
  constructor(){
    super()
}

  static get template() {
    return render(html`
      <div><h1>VisionLord<h1></div>
      <my-view></my-view>
    `, document.body)
  }
}

customElements.define('my-app', MyApp)
