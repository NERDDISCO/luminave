import sinon from 'sinon';
import expect from 'expect.js';

import PromisePolyfill from 'promise-polyfill';

import DmxOutput from '../../lib/transport/DmxOutput';

const OrigPromise = Promise;

describe('DMXOutput', () => {
  let clock, driver;

  beforeEach(() => {
    // as we are testing stuff related to promises and their timing behaviour
    // together with Promises, we want to use a promise implementation that
    // uses the fake-timers from sinon.
    global.Promise = PromisePolyfill;
    clock = sinon.useFakeTimers();
    driver = {
      send: sinon.spy()
    };
    PromisePolyfill._setImmediateFn(clock.setImmediate);
  });

  afterEach(() => {
    global.Promise = OrigPromise;
    clock.restore();
  });

  describe('constructor()', () => {
    it('creates a buffer to be used', () => {
      let out = new DmxOutput(driver, 50);

      var buf = out.getBuffer();
      expect(buf).to.be.a(Buffer);
      expect(buf.length).to.be(512);
      expect(Array.prototype.slice.call(buf).join('')).to.match(/^0{512}$/);
    });
  });

  describe('start() / stop()', () => {
    it('will start sending frames with the given framerate', () => {
      let out = new DmxOutput(driver);

      // initialize universe
      out.initUniverse(0);

      // test calls when running
      out.start(1000 / 10);
      clock.tick(1000);
      expect(driver.send.callCount).to.be(11);


      // no more calls when stopped
      out.stop();
      clock.tick(1000);
      expect(driver.send.callCount).to.be(11);

      // restart with diffeerent speed, make sure this stays
      out.start(1000 / 20);
      clock.tick(500); // 20 FPS, so this adds another 11 calls
      expect(driver.send.callCount).to.be(22);

      driver.send.args.forEach(([buffer]) => {
        expect(buffer).to.be(out.getBuffer());
      });
    });

    it('will not do anything if initialized without a framerate', () => {
      let out = new DmxOutput(driver);

      out.start();
      clock.tick(1000);
      expect(driver.send.callCount).to.be(0);
    });

    it('send-loop stalls when driver-promise isn\'t resolved in time', () => {
      driver = {
        resolver: null,
        spy: sinon.spy(),
        send() {
          this.spy();
          return new Promise(res => { this.resolver = res; });
        }
      };

      let out = new DmxOutput(driver);
      out.initUniverse(0);
      out.start(1000 / 10);

      expect(driver.spy.callCount).to.be(0);

      // the first call happens immediately
      clock.tick(1);
      expect(driver.spy.callCount).to.be(1);
      // the resolver of the first call resolves after 110ms, so 10 ms too late
      setTimeout(driver.resolver, 110);

      // time = 100: as the promise didn't resolve at this point,
      // send shouldn't have been called again yet.
      clock.tick(99);
      expect(driver.spy.callCount).to.be(1);

      // time = 110; at this point the promise resolves (i.e. send complete),
      // should notify about the skipped frame but not call send again.
      clock.tick(10);
      expect(driver.spy.callCount).to.be(1);

      // time = 200; the second frame is now rendered
      clock.tick(90);
      expect(driver.spy.callCount).to.be(2);

      driver.resolver();

      // as the promise resolves immediately, we can expect the third frame to
      // be rendered in time
      clock.tick(100);
      expect(driver.spy.callCount).to.be(3);
    });
  });

  describe('send()', () => {
    describe('multiple universes', () => {
      let multiDriver;

      beforeEach(() => {
        multiDriver = {
          resolvers: [],
          promises: [],
          spies: [sinon.spy(), sinon.spy()],

          send(buffer, universe) {
            this.spies[universe - 1](buffer, universe);
            return this.promises[universe - 1];
          }
        };

        multiDriver.promises.push(new Promise(resolve => { multiDriver.resolvers[0] = resolve; }));
        multiDriver.promises.push(new Promise(resolve => { multiDriver.resolvers[1] = resolve; }));
      });

      it('calls send for every registered universe', () => {
        let out = new DmxOutput(multiDriver, 2);

        // driver not called unless universe were initialized
        out.send();
        expect(multiDriver.spies[0].callCount).to.be(0);
        expect(multiDriver.spies[1].callCount).to.be(0);

        // initialize universes and try again
        out.getBuffer(1);
        out.getBuffer(2);
        out.send();
        expect(multiDriver.spies[0].callCount).to.be(1);
        expect(multiDriver.spies[1].callCount).to.be(1);
        expect(multiDriver.spies[0].args[0][0]).to.be(out.getBuffer(1));
        expect(multiDriver.spies[0].args[0][1]).to.be(1);
        expect(multiDriver.spies[1].args[0][0]).to.be(out.getBuffer(2));
        expect(multiDriver.spies[1].args[0][1]).to.be(2);
      });

      it('returned promise resolves when all driver promises are resolved', done => {
        let out = new DmxOutput(multiDriver, 2);

        const promise = out.send();

        multiDriver.resolvers[0]();

        promise.then(() => done(new Error('promise shouldn\'t be resolved here')));

        process.nextTick(done);
      });

      it('returned promise resolves when all driver promises are resolved', done => {
        let out = new DmxOutput(multiDriver, 2);

        const promise = out.send();

        promise.then(() => done());

        multiDriver.resolvers[0]();
        multiDriver.resolvers[1]();

        clock.tick(1);
      });

      it('returned promise resolves when driver doesn\'t return a promise', done => {
        let out = new DmxOutput({send() {}});
        out.send().then(() => { done(); });

        clock.tick(0);
      });
    });
  });

  describe('getBuffer()', () => {
    it('returns a valid buffer', () => {
      let out = new DmxOutput(driver);

      expect(out.getBuffer()).to.be.a(Buffer);
    });
  });

  describe('requestDmxFrame()', () => {
    it('callback is invoked before the frame gets sent', () => {
      let out = new DmxOutput(driver),
        spy = sinon.spy();

      let callback = (dt) => {
        out.requestDmxFrame(callback);
        spy(dt);
      };

      out.requestDmxFrame(callback);
      out.start(1000 / 10);

      clock.tick(100);

      // start will immediately send the first frame, the second frame
      // gets sent after 100ms.
      expect(spy.callCount).to.be(2);
      expect(spy.args[0][0]).to.be(0);
      expect(spy.args[1][0]).to.be(100);

      clock.tick(900);
      expect(spy.callCount).to.be(11);
    });
  });
});
