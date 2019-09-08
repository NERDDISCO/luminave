import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { addVenueSlot, setVenueSlot, removeVenueSlot } from '../../actions/venue.js'
import { addAnimation, setAnimation, removeAnimation, addScene, setScene, removeScene, removeSceneFromTimelineAndResetFixtures } from '../../actions/index.js'
import { getFixtures, getLive } from '../../selectors/index.js'
import '../../components/venue/slot-item.js'
import { repeat } from 'lit-html/directives/repeat.js'
import uuidv1 from 'uuid/v1.js'
import { defaultValue } from '../../directives/default-value.js'
import { classMap } from 'lit-html/directives/class-map.js'

/*
 * Show MIDI buttons in a grid
 */
class VenueSlotGrid extends connect(store)(LitElement) {

  static get properties() {
    return {
      venueId: { type: String },
      venueName: { type: String },
      width: { type: Number },
      height: { type: Number },
      slots: { type: Array },
      fixtureManager: { type: Array },
      live: { type: Boolean }
    }
  }

  _stateChanged(state) {
    this.fixtureManager = getFixtures(state)
    this.live = getLive(state)
  }

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeGridVars(width) {
    const vars = { '--width': width }

    return Object.keys(vars).map(key => [key, vars[key]].join(':')).join(';')
  }

  changeSlot(e) {
    const { x, y, name, modv, animations, fixtures } = e.detail
    let { id, sceneId } = e.detail

    // ID doesn' exist yet because this is a new slot
    if (id === undefined) {
      id = uuidv1()

      store.dispatch(addVenueSlot(this.venueId, {
        x,
        y,
        name,
        id,
        modv
      }))

      // Create new animation
      const keyframes = {
        0: { modvColor: modv },
        1: { modvColor: modv }
      }
      const duration = 2000
      const animationId = uuidv1()

      store.dispatch(addAnimation({
        id: animationId,
        keyframes,
        duration,
        name: `${name}`
      }))

      // Add the animation to the slot
      animations.push(animationId)

      // Create new scene
      sceneId = uuidv1()

      store.dispatch(addScene({
        id: sceneId,
        fixtures,
        animations,
        duration,
        name: `${name}`
      }))

      // Update slot
      store.dispatch(setVenueSlot(this.venueId, {
        id,
        animations,
        sceneId
      }))

      this._addFixtures(id, fixtures, sceneId)

    // Update existing slot
    } else {
      store.dispatch(setVenueSlot(this.venueId, {
        x,
        y,
        name,
        id,
        modv
      }))

      // Update animations
      animations.forEach(animationId => {
        const keyframes = {
          0: { modvColor: modv },
          1: { modvColor: modv }
        }

        store.dispatch(setAnimation({
          id: animationId,
          keyframes,
          name: `${name}`
        }))
      })

      // Update scene
      store.dispatch(setScene({
        id: sceneId,
        fixtures,
        animations,
        name: `${name}`
      }))

    }
  }

  removeSlot(e) {
    const { x, y, id, animations, sceneId } = e.detail

    store.dispatch(removeSceneFromTimelineAndResetFixtures(sceneId))
    store.dispatch(removeScene(sceneId))

    animations.forEach(animationId => {
      store.dispatch(removeAnimation(animationId))
    })

    store.dispatch(removeVenueSlot(this.venueId, {
      x,
      y,
      id
    }))
  }

  addFixtures(e) {
    e.preventDefault()
    const { id, fixtures, sceneId } = e.detail
    this._addFixtures(id, fixtures, sceneId)
  }

  _addFixtures(id, fixtures, sceneId) {
    store.dispatch(setVenueSlot(this.venueId, {
      id,
      fixtures
    }))

    // Update scene
    store.dispatch(setScene({
      id: sceneId,
      fixtures
    }))
  }

  removeFixture(e) {
    e.preventDefault()

    const { id, fixtures, sceneId } = e.detail

    store.dispatch(setVenueSlot(this.venueId, {
      id,
      fixtures
    }))

    // Update scene
    store.dispatch(setScene({
      id: sceneId,
      fixtures
    }))
  }

  render() {
    const { width, height, slots, venueName, fixtureManager } = this
    const itemTemplates = []

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        // Find all slots for the current position
        let slotItems = slots.filter(slot => slot.x === x && slot.y === y)
        let slotUsed = true

        // Set a default slot if no match was found
        if (slotItems.length === 0) {
          slotItems = [{}]
          slotUsed = false
        }
      
        // Push all slots into the current position
        itemTemplates.push(html`
          <div class="item ${classMap({ active: slotUsed })}">

            ${repeat(slotItems, slot => html`
              <venue-slot-item 
                x="${x}"
                y="${y}"
                .id="${slot.id}"
                .name="${slot.name}"
                .modv="${slot.modv}"
                .animations="${slot.animations}"
                .sceneId="${slot.sceneId}"
                .fixtures="${defaultValue(slot.fixtures, [])}"
                .fixtureManager="${fixtureManager}"
                @change-slot="${e => this.changeSlot(e)}"
                @remove-slot="${e => this.removeSlot(e)}"
                @add-fixtures="${e => this.addFixtures(e)}"
                @remove-fixture="${e => this.removeFixture(e)}"
              />
            `)}

            <div class="meta">
              [${x}:${y}]
            </div>

          </div>
        `)

      }
    }

    return html`
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(var(--width), 1fr);
          grid-gap: .25em;
          transition: all .25s ease-in-out;
          background: #111;
          padding: .5em;
        }

        .item {
          /* opacity: .15; */
          position: relative;
          filter: invert(100%);
          background: var(--mdc-theme-surface);
          /* border: 10px solid var(--mdc-theme-background); */
          border-radius: .15em;
          min-height: 5em;
          color: #000;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: .15em;
          transition: all .25s ease-in-out;
        }

        .item.active {
          opacity: 1;
          filter: invert(0%);
        }

        .item:focus-within {
          z-index: 1337;
        }

        .label {
          font-size: 22px;
          font-weight: 400;
        }

        .meta {
          position: absolute;
          bottom: 0;
          right: 0;
          font-size: .8em;
          opacity: .55;
          padding: .25em;
        }
      </style>

      <div class="container" style="${this.computeGridVars(width, height)}">
        ${itemTemplates}
      </div>
    `
  }

}

customElements.define('venue-slot-grid', VenueSlotGrid)
