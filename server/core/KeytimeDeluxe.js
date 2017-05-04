"use strict";

import lerp from 'lerp-array';
import keytime from 'keytime';

export default class KeytimeDeluxe extends keytime {
  constructor(data) {
    super(data);
  }

  interpolate(property, frame1, frame2, t) {
    // Custom interpolation :D
    if (typeof frame1.value === 'string') {
      return frame1.value;
    }

    // Default interpolation
    return lerp(frame1.value, frame2.value, t);
  }
}
