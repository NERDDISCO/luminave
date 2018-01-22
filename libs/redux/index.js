/*
 * Helper to bind global window.Redux to a "es6 module" version
 */
const redux = window.Redux
export default redux

export const createStore = redux.createStore
export const combineReducers = redux.combineReducers
export const applyMiddleware = redux.applyMiddleware
