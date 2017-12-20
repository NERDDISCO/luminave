import PolymerRedux from '/node_modules/polymer-redux/polymer-redux.js'
import { createStore, combineReducers } from '/libs/redux/index.js'
import * as reducers from './reducers/index.js'
import { STORAGE_STATE } from '/src/constants/index.js'

export const store = createStore(
  combineReducers({
    ...reducers
  }),
  localStorage.getItem(STORAGE_STATE) ? JSON.parse(localStorage.getItem(STORAGE_STATE)) : {}
)

// @see https://github.com/tur-nr/polymer-redux#polymerredux
const reduxMixin = PolymerRedux(store)

// ReduxMixin
// @see https://github.com/tur-nr/polymer-redux#redux-mixin
export default reduxMixin
