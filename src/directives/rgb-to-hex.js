import { directive } from '/node_modules/lit-html/lit-html.js'

/*
 * Convert an RGB-Array into a Hex color
 */
export const rgbToHex = (value, defaultValue = '#000000') => directive(part => {
    // Is an RGB array
    if (Array.isArray(value) && value.length === 3) {
        const hex = `#${value.map(x => x.toString(16).padStart(2, '0')).join('')}`
        part.setValue(hex)
    // Is not an RGB array, so use the defaultValue
    } else {
        part.setValue(defaultValue)
    }
})
