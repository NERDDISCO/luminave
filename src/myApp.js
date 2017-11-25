import { dedupingMixin } from '/node_modules/@polymer/polymer/lib/utils/mixin.js'

import { createStore, combineReducers } from '/libs/redux/index.js'

import { SET_CHANNEL } from './constants/index.js'
import { channels } from './reducers/index.js'
import { setChannel } from './actions/index.js'

const app = {}

app.actions = {
  setChannel
}

const store = createStore(
  combineReducers({
    channels
  })
)

app.store = store

const reduxMixin = PolymerRedux(store)

/* @mixinFunction */
const actionsMixin = (superClass) => {
  return class extends reduxMixin(superClass) {
    static get actions() {
      return app.actions
    }
  }
}

app.ReduxMixin = dedupingMixin(actionsMixin)

export default app

// setInterval(() => {
//  app.store.dispatch(app.actions.setChannel(0, Math.floor(Math.random() * 254)))
// }, 500)
