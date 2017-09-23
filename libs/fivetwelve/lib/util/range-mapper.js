/**
 * create a function for translating a value with a given input-range
 * into the corresponding value for the output-range.
 *
 * @param {Number} inStart start of the input-range
 * @param {Number} inEnd end of the inputRange
 * @param {Number} outStart start of the output-range
 * @param {Number} outEnd start of the input-range
 * @returns {function(Number): Number} the mapping-function
 */
export function rangeMapper(inStart, inEnd, outStart, outEnd) {
  return x =>
      (x - inStart) * (outEnd - outStart) / (inEnd - inStart) + outStart;
}

/**
 * Clamped version of {@see #rangeMapper()}.
 * @param {Number} inStart start of the input-range
 * @param {Number} inEnd end of the inputRange
 * @param {Number} outStart start of the output-range
 * @param {Number} outEnd start of the input-range
 * @returns {function(Number): Number} the mapping-function
 */
export function clampedRangeMapper(inStart, inEnd, outStart, outEnd) {
  let mapper = rangeMapper.apply(this, arguments),
    min = Math.min(outStart, outEnd),
    max = Math.max(outStart, outEnd);

  return x => Math.max(min, Math.min(max, mapper(x)));
}
