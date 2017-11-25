/**
 * @file index.js
 * @module abcQ
 * @overview Number / character combination encoder / decoder
 *
 * @author Gregor Adams <greg@pixelass.com>
 * @licence The MIT License (MIT) - See file 'LICENSE' in this project.
 */

/**
 * all lowercase and uppercase letters of the alphabet.
 * Does not include special characters, numbers, puctuation or similar
 * @type {String}
 * @private
 */
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

class abcQ {
  /**
   * [constructor description]
   * @param  {Object} [options={}] Set options to configure the output when
   *                               generating ids or converting numbers
   * @param  {String|Array} options.chars The list of characters to combine. It can be an `Array`
   *                                      or a `String`. If the list contains special characters,
   *                                      emojis or similar it should be an `Array`.
   * @param  {Number} options.counter The counter can be initialized with this value. If you want
   *                                  to start with some longer names try setting `counter: 100000`.
   *                                   The default value is set to `-1` any lower value will return `null`
   * @return {this} returns an instance of itself
   * @example
   * const unicornLove = new abcQ({
   *   chars: ['🦄','💖'],
   *   counter: 42
   * })
   */
  constructor (options = {}) {
    /**
     * The default config is used as a fallback if options
     * were missing
     * @private
     * @type {Object}
     * @property {String} chars Defults to all uppercase and lowercase characters of the alphabet
     * @property {Number} counter Defults to `-1`
     */
    const defaults = {
      chars: alphabet,
      counter: -1
    }
    /**
     * The defaults extended by the options.
     * @private
     * @type {Object}
     */
    this.options = Object.assign(defaults, options)
    /**
     * The list of characters to combine. It can be an `Array` or a `String`.
     * If the list contains special characters, emojis or similar it should be
     * an `Array`.
     * @type {String|Array}
     * @private
     */
    this.chars = this.options.chars
    /**
     * initial value for the counter. Cannot be lower than `-1`
     * @type {Number}
     * @private
     */
    this.counter = this.options.counter
  }

  /**
   * Method to generate the next string.
   *
   * This method is not affected by calling other methods.
   * It will always return the next combination of characters
   *
   * @return {String} Returns the next character combination
   * @example
   * const shortid = new abcQ({
   *   chars: 'ab'
   * })
   * let counter = 0
   * do {
   *   console.log(shortid.generate())
   * } while (++counter < 10)
   * // -> a b aa ab ba bb aaa aab aba abb
   */
  generate () {
    return this.encode(++this.counter)
  }

  /**
   * Method to encode a number into a combination of characters
   *
   * This method does not affect any other method.
   * This method can be called multiple times before calling `generate`
   *
   * @param  {Number} i A number greater than `-1`. Given a list of `"ab"
   *                  the following will  be returned
   *                  - 0 -> "a"
   *                  - 1 -> "b"
   *                  - 2 -> "aa"
   *                  - 3 -> "ab"
   *                  - ...
   * @return {String} Returns the character combination of the number
   * @example
   * const shortid = new abcQ({
   *   chars: 'ab'
   * })
   * console.log(shortid.encode(0))
   * // -> "a"
   * console.log(shortid.encode(9))
   * // -> "abb"
   */
  encode (i) {
    /*
     * Check if the number is smaller than 0.
     * Then return `null` or continue
     */
    if (i < 0) {
      return null
    }
    /*
     * Check for the next slot. A slot is generated when the number in the
     * current slot is greater than the number of characters in the list.
     * If a slot is `0` it will not be counted. Instead the value is used as a flag
     * This means the fist slot has a `0`-based index while the next slots are `1`-based
     * ### Example
     * - 'ab': 1; `slots = [1, 0]    -> "b"`
     * - 'ab': 2; `slots = [2, 1]    -> "aa"`
     * - 'ab': 9; `slots = [9 ,5, 2] -> "abb"`
     */
    const nextSlot = ~~(i / this.chars.length)

    /* Combine and return all slots. */
    const previousSlots = nextSlot ? this.encode(nextSlot - 1) : ''
    const currentSlot = this.chars[i % this.chars.length]
    return previousSlots + currentSlot
  }

  /**
   * Method to decode a combination of characters into a number
   *
   * This method does not affect any other method.
   * This method can be called multiple times before calling `generate`
   *
   * @param  {String} str Character combination to decode. Must contain only valid
   *                      characters, Given a list of `"ab"
   *                      the following will be returned
   *                      - "a"  -> 0
   *                      - "b"  -> 1
   *                      - "aa" -> 2
   *                      - "ab" -> 3
   *                      - ...
   * @return {Number} Returns the index of the input string
   * @example
   * const shortid = new abcQ({
   *   chars: 'ab'
   * })
   * console.log(shortid.decode('a'))
   * // -> o
   * console.log(shortid.decode('abb'))
   * // -> 9
   */
  decode (str) {
    /*
     * Check if the string contains invalid characters.
     * Then return `null` or continue
     */
    if (str.replace(new RegExp(`[${this.chars}]`, 'g'), '') !== '') {
      return null
    }

    /* Build the index for the given string */
    let i = 0
    let counter = str.length
    /* For every slot add the result.
     * Adds all slots to return a `1`-based index
     */
    while (counter--) {
      const pow = Math.pow(this.chars.length, str.length - 1 - counter)
      i += (this.chars.indexOf(str[counter]) + 1) * pow
    }
    /* Subtract `1` to switch back to a `0`-based index */
    return i - 1
  }
}

export default abcQ
