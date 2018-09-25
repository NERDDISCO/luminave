import { createStore, combineReducers, applyMiddleware } from '/node_modules/redux/es/index.js'

import * as reducers from './reducers/index.js'
import app from './reducers/app.js'

import thunk from '/node_modules/redux-thunk/src/index.js'
import { STORAGE_STATE } from '/src/constants/index.js'

export const store = createStore(
  combineReducers({
    ...reducers,
    app
  }),
  localStorage.getItem(STORAGE_STATE) ? JSON.parse(localStorage.getItem(STORAGE_STATE)) : {},
  applyMiddleware(thunk)
)
