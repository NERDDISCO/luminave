/**
 * get an array of all elements found in all of the passed arrays.
 * @template T
 * @param {Array.<Array.<T>>} arrays a list of arrays to intersect.
 * @returns {Array.<T>} the elements found in all arrays.
 */
export default function intersect(arrays) {
  if (arrays.length < 2) {
    return arrays[0] || [];
  }

  let res = [];
  arrays[0].forEach(el => {
    if (arrays.every(arr => arr.indexOf(el) !== -1)) {
      res.push(el);
    }
  });

  return res;
}
