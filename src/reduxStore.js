import { createStore, combineReducers, applyMiddleware } from 'redux/es/index.js'

import * as reducers from './reducers/index.js'
import app from './reducers/app.js'
import venueManager from './reducers/venue.js'
import modvManager from './reducers/modv.js'
import luminaveServer from './reducers/luminave-server.js'

import thunk from 'redux-thunk/src/index.js'
import { STORAGE_STATE } from './constants/index.js'

export const store = createStore(
  combineReducers({
    ...reducers,
    app,
    venueManager,
    modvManager,
    luminaveServer
  }),
  localStorage.getItem(STORAGE_STATE) ? JSON.parse(localStorage.getItem(STORAGE_STATE)) : {},
  applyMiddleware(thunk)
)
