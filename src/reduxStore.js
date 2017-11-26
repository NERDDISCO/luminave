import { dedupingMixin } from '/node_modules/@polymer/polymer/lib/utils/mixin.js'

import { createStore, combineReducers } from '/libs/redux/index.js'

import * as reducers from './reducers/index.js'
import * as actions from './actions/index.js'

export const store = createStore(
  combineReducers({
    ...reducers
  }, {
    connectManager: {usb: false, bluetooth: true}
  })

)

const reduxMixin = PolymerRedux(store)

/* @mixinFunction */
const actionsMixin = (superClass) => {
  return class extends reduxMixin(superClass) {
    static get actions() {
      return actions
    }
  }
}

export default dedupingMixin(actionsMixin)
