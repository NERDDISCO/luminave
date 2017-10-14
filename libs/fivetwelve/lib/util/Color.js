// import parseColor from 'parse-color';
// import colorConvert from 'color-convert';

export default class Color {

  /**
   * Creates a new color instance from a css color-string.
   * @param {String} color
   */
  constructor(color) {
    this.set(color)
  }

  set(color) {
    if (Array.isArray(color)) {
      this.rgb = color
    } else if (arguments.length === 3) {
      this.rgb = Array.prototype.slice.call(arguments)
    } else if (typeof color === 'string') {
      this.rgb = color.replace(/[^\d,]/g, '').split(',')
    } else {
      this.rgb = [0, 0, 0]
    }
  }

  /**
   * Returns the color-value as `rgb(…)` string.
   * @returns {string}
   */
  toString() {
    return `rgb(${this.rgb.join(',')})`
  }
}


['r', 'g', 'b'].forEach((prop, idx) => {
  Object.defineProperty(Color.prototype, prop, {
    get() {
      return this.rgb[idx]
    },
    set(value) {
      this.rgb[idx] = value
    }
  })
})

// Object.defineProperty(Color.prototype, 'hsl', {
//   get() {
//     return colorConvert.rgb2hsl(this.rgb);
//   },
//   set(value) {
//     this.rgb = colorConvert.hsl2rgb(value);
//   }
// });

// ['h', 's', 'l'].forEach(function(prop, idx) {
//   Object.defineProperty(Color.prototype, prop, {
//     get() {
//       return this.hsl[idx];
//     },
//
//     set(value) {
//       let hsl = this.hsl;
//       hsl[idx] = value;
//       this.hsl = hsl;
//     }
//   });
// });

Object.defineProperty(Color.prototype, 'cmy', {
  get() {
    return [255 - this.rgb[0],
      255 - this.rgb[1],
      255 - this.rgb[2]]
  },

  set(value) {
    this.rgb = [255 - value[0],
      255 - value[1],
      255 - value[2]]
  }
});

['c', 'm', 'y'].forEach((prop, idx) => {
  Object.defineProperty(Color.prototype, prop, {
    get() {
      return this.cmy[idx]
    },

    set(value) {
      const tmp = this.cmy
      tmp[idx] = value
      this.cmy = tmp
    }
  })
})

/**
 * Linear interpolation from a to b at point t.
 * @param {Number} a
 * @param {Number} b
 * @param {Number} t
 * @returns {number}
 * @private
 */
function lerp(a, b, t) {
  return a * t + (1 - t) * b
}

// /**
//  * Mixes two color-values by linearily interpolation in HSL-space.
//  * @param {Color} c1
//  * @param {Color} c2
//  * @param {Number} amt mixing relation (0 -> c1, 1 -> c2)
//  * @returns {Color}
//  */
// Color.mix = function(c1, c2, amt = 0.5) {
//   let hsl1 = c1.hsl,
//     hsl2 = c2.hsl,
//     h1 = hsl1[0],
//     h2 = hsl2[0];
//
//   let res = new Color();
//
//   if (Math.abs(h2 - h1) > 180) {
//     h1 -= 180;
//     h2 -= 180;
//   }
//
//   res.hsl = [
//     lerp(h1, h2, amt),
//     lerp(hsl1[1], hsl2[1], amt),
//     lerp(hsl1[2], hsl2[2], amt)
//   ];
//
//   return res;
// };
