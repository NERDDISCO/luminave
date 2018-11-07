import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { defaultValue } from '../../directives/default-value.js'
import '@polymer/paper-dialog/paper-dialog.js'
import '@material/mwc-button/mwc-button.js'
import '@material/mwc-icon/mwc-icon.js'
import { when } from '/node_modules/lit-html/directives/when.js'
import '../fixture-list/index.js'

/*
 * One slot in the slots of an venue
 */
class VenueSlotItem extends LitElement {

  static get properties() {
    return {
      x: { type: Number },
      y: { type: Number },
      id: { type: String },
      name: { type: String },
      modv: { type: Number },
      animations: { type: Array },
      sceneId: { type: String },
      fixtures: { type: Array },
      fixtureManager: { type: Array },
      isEditing: { type: Boolean }
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)
    const name = data.get('name')
    const modv = parseInt(data.get('modv'), 10)
    const x = parseInt(data.get('x'), 10)
    const y = parseInt(data.get('y'), 10)
    const animations = this.animations || []
    const fixtures = this.fixtures || []
    const { sceneId } = this

    this.dispatchEvent(new CustomEvent('change-slot', {
      detail: {
        event: e,
        name,
        modv,
        animations,
        fixtures,
        sceneId,
        id: this.id,
        x,
        y
      }
    }))
  }

  removeSlot(e) {
    // Dialog was closed
    if (e.type === 'iron-overlay-closed') {

      // Dialog was confirmed
      if (e.detail.confirmed) {
        const { animations, fixtures, sceneId } = this

        this.dispatchEvent(new CustomEvent('remove-slot', {
          detail: {
            event: e,
            id: this.id,
            animations,
            fixtures,
            sceneId
          }
        }))
      }

    // Dialog should be opened
    } else {
      const dialog = this.shadowRoot.getElementById('dialog')

      // Save the ID of the current fixture to be deleted
      this._removeVenueId = e.target.venueId

      dialog.positionTarget = e.target
      dialog.open()
    }
  }

  handleAddFixtures(e) {
    // Prevent sending data to server & reset all fields
    e.preventDefault()

    const { fixtureIds } = e.detail
    const fixtures = [...new Set([...this.fixtures, ...fixtureIds])]
    const { sceneId } = this

    this.dispatchEvent(new CustomEvent('add-fixtures', {
      detail: {
        event: e,
        id: this.id,
        fixtures,
        sceneId
      }
    }))
  }

  handleRemoveFixture(e) {
    // Prevent sending data to server & reset all fields
    e.preventDefault()

    const { fixtureId } = e.detail
    const fixtures = this.fixtures.filter(_fixtureId => _fixtureId !== fixtureId)
    const { sceneId } = this

    this.dispatchEvent(new CustomEvent('remove-fixture', {
      detail: {
        event: e,
        id: this.id,
        fixtures,
        sceneId
      }
    }))
  }

  handleEdit() {
    this.isEditing = !this.isEditing
  }

  render() {
    const { x, y, name, modv, fixtures, fixtureManager } = this
    let { isEditing } = this

    // Does the slot has any content yet?
    const hasContent = name !== undefined

    // Are we editing the slot?
    if (isEditing === undefined) {
      isEditing = false
    }

    // Are there fixtures added to this slot?
    const missingFixtures = fixtures.length === 0

    return html`
      <style>
        .warning {
          color: var(--mdc-theme-secondary);
        }
      </style>

      ${when(isEditing,
        () => html`

          ${when(missingFixtures, 
            () => html`<mwc-icon class="warning">warning</mwc-icon>`,
            () => html``
          )}

          <form @submit="${e => this.handleSubmit(e)}" autocomplete="off">
            <input name="x" type="number" .value="${defaultValue(x, '')}" min="0" required placeholder="x" />
            <input name="y" type="number" .value="${defaultValue(y, '')}" min="0" required placeholder="y" />
            <input name="name" type="text" .value="${defaultValue(name, '')}" required placeholder="Name" />
            <input name="modv" type="number" .value="${defaultValue(modv, '')}" min="1" required placeholder="modV" id="focus" />

            <button type="submit">Update</button>
            <mwc-button icon="delete" @click="${e => this.removeSlot(e)}"></mwc-button>
          </form>

          ${when(hasContent,
            () => html`
              <fixture-list
                @add-fixtures="${e => this.handleAddFixtures(e)}"
                @remove-fixture="${e => this.handleRemoveFixture(e)}"
                .fixtures="${fixtures}"
                .fixtureManager="${fixtureManager}"
              />
            `, 
            () => html``
          )}

          <mwc-button icon="cancel" @click="${() => this.handleEdit()}"></mwc-button>

          <paper-dialog id="dialog" no-overlap horizontal-align="left" vertical-align="top" dynamic-align="true" @iron-overlay-closed="${e => this.removeSlot(e)}">
            <h2>Delete "${defaultValue(name, '')}" Slot?</h2>
            <div class="buttons">
              <paper-button dialog-dismiss>No</paper-button>
              <paper-button raised dialog-confirm autofocus>Yes</paper-button>
            </div>
          </paper-dialog>
        `,

        () => html`
          <h3>${name}</h3>

          ${when(hasContent && missingFixtures, 
            () => html`<mwc-icon class="warning">warning</mwc-icon>`,
            () => html``
          )}

          <mwc-button icon="edit" @click="${() => this.handleEdit()}"></mwc-button>
        `
      )}


    `
  }

}

customElements.define('venue-slot-item', VenueSlotItem)
