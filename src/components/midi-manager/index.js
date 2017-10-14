/* @TODO: Implement


purpose: Manage a list of MidiController and manage Web MIDI by using the WebMIDI.js lib
current implementation: core/MidiManager.js


<midi-manager list="midiDeviceList" on-update="handleUpdate" />


midiDeviceList = MidiManager.list
on-update = add Midi devices to MidiManger.list

-> every element of midiDeviceList should be a midi-controller component
 */


 import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
 import MidiManager from '/src/core/MidiManager.js'

 /**
  * The tap button renders a button to manually set the bpm.
  * It waits for a given number of positions.
  */
 export class MidiManagerComponent extends PolymerElement {
   constructor() {
     super()
   }

   ready() {
     super.ready()

     // This.midiManager = new MidiManager({ config: this.config })
   }

   handleClick() {
     console.log('click')
   }

   static get template() {
     return `
     <style>
       :host {
         --height: 20em;
         --background: var(--background-lighter);
       }
       button {
           box-sizing: border-box;
           height: var(--height);
           width: calc(100% - 1em);
           border: 0;
           font-size: 1em;
           line-height: calc(var(--height) - 1em);
           margin: 0.5em;
           padding: 0.5em 1em;
           font-family: monospace;
           border-radius: 0;
           color: var(--color);
           background: var(--background);
           box-shadow: 0 0 0 1px var(--color);
           cursor: pointer;
         }

         button:focus {
           outline: 0;
           --color: var(--focus-color);
           --background: var(--focus-background);
         }

         button:active {
           --background: var(--background-darker);
           --color: var(--color-lighter);
         }
     </style>
       <button>MIDI Manager</button>
     `
   }
 }

 customElements.define('midi-manager', MidiManagerComponent)
