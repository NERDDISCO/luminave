"use strict";

import fs from 'fs';
import assert from 'assert';

var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

describe('config', () => {

  describe('name', () => {

    it('is !undefined', () => {
      assert.equal(true, typeof config.name !== undefined);
    });

  });

  describe('server', () => {

    it('is !undefined', () => {
      assert.equal(true, typeof config.server !== undefined);
    });

    it('port is !undefined', () => {
      assert.equal(true, typeof config.server.port !== undefined);
    });

  });

});
