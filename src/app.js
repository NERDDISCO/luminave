import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'

import app from './myApp.js'

import './components/my-view/index.js'

class Foo extends app.ReduxMixin(PolymerElement) {
  constructor() {
    super()

    setInterval(() => {
     this.dispatch(app.actions.setChannel(0, Math.floor(Math.random() * 254)))
    }, 500)

  }

  // getChannels(state) {
  //   console.log(state)
  //   return this.getState().channels
  // }

  static get properties() {
    return {
      channels: {
        type: Array
      },
      actions: {
        type: Object
      }
    }
  }

  static get template() {
    return `
      <my-view channels="{{channels}}"></my-view>
    `
  }
}

class MyApp extends app.ReduxMixin(PolymerElement) {
  constructor(){
    super()
}

  static get template() {
    return render(html`
      <div>Hello World</div>
      <my-foo></my-foo>
    `, document.body)
  }
}

customElements.define('my-app', MyApp)
customElements.define('my-foo', Foo)
