import { directive } from 'lit-html/lit-html.js'

/*
 * Find out if the provided value is defined or equals the value of the <option></option>
 * to set the "selected" attribute
 */
export const selected = (value, optionValue) => directive(part => {
    if (value === undefined) {
      part.setValue(false)
    } else if (optionValue === value) {
      part.setValue(true)
    } else {
      part.setValue(false)
    }
})
