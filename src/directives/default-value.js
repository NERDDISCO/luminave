import { directive } from 'lit-html/lit-html.js'

/*
 * Set a default value if the provided value is undefined
 */
export const defaultValue = directive((value, defaultVal) => part => {
  if (value === undefined || value === 'undefined') {
      value = defaultVal
  }

  part.setValue(value)
})
