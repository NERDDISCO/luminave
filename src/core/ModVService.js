// import randomColor from '/node-modules/random-color/index.js';
// import { Observable, fromEvent, filter } from '/node_modules/@reactivex/rxjs/index.js'
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/operator/filter';

/**
 * Provide colors from modV.
 */
export default class ModVService {
  constructor(param) {

    // this.globalColor = randomColor().rgbArray();

    this.random();
  }

  random() {
    setInterval(() => {
      this.globalColor = [255, 0, 0];
    }, 120);
  }

  // @TODO: Implement
  listen() {
    // var source = Observable
    //   .fromEvent(eventService, 'MidiController')
    //
    //   // Only allow the MIDI controller that was attachted to this scene
    //   .filter((data, idx, obs) => {
    //     return data.controllerId === this.midi.controllerId;
    //   })
    //
    //   // Only allow a specific input element (button or knob) from the MIDI controller
    //   .filter((data, idx, obs) => {
    //     return data.partId === this.midi.partId;
    //   });
    //
    // source.subscribe(data => {
    //   this.stop();
    //   this.play();
    // });
  }
}

export let modVService = new ModVService();
