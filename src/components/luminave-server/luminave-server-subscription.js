
import { LitElement, html, css } from 'lit-element/lit-element.js'
import gql from 'graphql-tag'
import { ApolloSubscription } from '@apollo-elements/lit-apollo'
import { setAnimation } from '../../actions'


// TODO: Remove later
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import Color from 'color'
import { toFixedNumber } from '../../utils/index.js'

// Compute graphql documents statically for performance
const subscription = gql`
  subscription {
    rawUpdated {
      data
    }
  }
`

/**
 * Subsribe to the luminave-server to get updates
 */
class LuminaveServerSubscription extends connect(store)(ApolloSubscription) {

  constructor() {
    super()

    this.lastValues = {
      dimmer: 0
    }
  }
  
  static get properties() {
    return {
      client: { type: Object }
    }
  }

  static get styles() {
    return css`
    `
  }

  shouldUpdate(changedProps) {
    if (changedProps.has('client')) {
      return true
    }

    if (changedProps.has('data')) {
      console.log(this.data.rawUpdated.data)
      this._setAnimation(this.data.rawUpdated.data)
    }

    return (
      this.loading != null ||
      this.data ||
      this.error
    );
  }

  updated(changedProps) {
    // Create a new subscription if the client was set
    if (changedProps.has('client')) {
      this.subscription = subscription
    }
  }

  _stateChanged() {

  }

  _setAnimation(data) {

    const { intensity, transitionDuration, color, action, actionStrength } = data

    const dimmer = Math.round(255 * intensity)

    // TODO: duration should be in ms, not in seconds (luminave only supports seconds as of now)
    const duration = toFixedNumber(transitionDuration / 1000, 1)

    const _color = Color(color).rgb().array()

    let keyframes = {
      0: { 
        dimmer: dimmer,
        color: _color
      },
      1: { 
        dimmer: dimmer,
        color: _color
      }
    }

    switch (action) {
      case 'normal':
        keyframes = {
          0: {
            dimmer: dimmer,
            color: _color
          },
          1: {
            dimmer: dimmer,
            color: _color
          }
        }
        break
       
     case 'fade':
        // fade down
        if (dimmer === 0) {
          keyframes = {
            0: {
              dimmer: this.lastValues.dimmer,
              color: _color
            },
            1: {
              dimmer: dimmer,
              color: _color
            }
          }
        // fade up
        } else {
          keyframes = {
            0: {
              dimmer: this.lastValues.dimmer,
              color: _color
            },
            1: {
              dimmer: dimmer,
              color: _color
            }
          }
        }
        break

      case 'shake':
        keyframes = this._createShake(_color, actionStrength, dimmer)
        break

      case 'strobe':
        keyframes = this._createStrobe(_color, actionStrength, dimmer)
        break

      case 'oscillate':
        keyframes = this._createOscillate(_color, actionStrength, dimmer)
        break
    
      default:
        break
    }

    console.log(JSON.stringify(keyframes))

    store.dispatch(setAnimation({
      // TODO: Get ID by name
      id: "a5d47590-6908-11e9-8c5e-cf09166b76ae",
      keyframes,
      duration
    }))

    // Save the last value
    this.lastValues = { dimmer }
  }

  _createShake(color, actionStrength, dimmer) {
    let keyframes = {}
    // Defines the number of steps, higher value means faster changes
    const steps = 30 * actionStrength

    for (let step = 0; step <= steps; step++) {
      let _step = (1 / steps * step).toFixed(2)

      keyframes[_step] = {}

      // keyframes[_step].dimmer = step % 2 === 0 ? dimmer : 0
      keyframes[_step].dimmer = Math.floor(Math.random() * dimmer) + 0

      // First step
      if (step === 0) {
        keyframes[_step].color = color
      }

      // Last step
      if (step === steps) {
        keyframes[_step].color = color
      }
      
    }

    return keyframes
  }

  // TODO: Use strobe effect of the fixture instead
  _createStrobe(color, actionStrength, dimmer) {
    let keyframes = {}
    // Defines the number of steps, higher value means faster changes
    const steps = 50 * actionStrength

    for (let step = 0; step <= steps; step++) {
      let _step = (1 / steps * step).toFixed(2)

      keyframes[_step] = {}
      keyframes[_step + 0.15] = {}

      keyframes[_step].dimmer = step % 2 === 0 ? dimmer : 0
      keyframes[_step + 0.15].dimmer = step % 2 === 0 ? 0 : dimmer
      // keyframes[_step].dimmer = Math.floor(Math.random() * dimmer) + 0

      // First step
      if (step === 0) {
        keyframes[_step].color = color
      }

      // Last step
      if (step === steps) {
        keyframes[_step].color = color
      }
      
    }

    return keyframes
  }

  // TODO: Use strobe effect of the fixture instead
  _createOscillate(color, actionStrength, dimmer) {
    let keyframes = {}
    // Defines the number of steps, higher value means faster changes
    const steps = 30 * actionStrength

    for (let step = 0; step <= steps; step++) {
      let _step = (1 / steps * step).toFixed(2)

      keyframes[_step] = {}

      keyframes[_step].dimmer = step % 2 === 0 ? dimmer : 0

      // First step
      if (step === 0) {
        keyframes[_step].color = color
      }

      // Last step
      if (step === steps) {
        keyframes[_step].color = color
      }
      
    }

    return keyframes
  }

  render() {
    const { error } = this

    return html`
    ${error}
    `
  }
}

customElements.define('luminave-server-subscription', LuminaveServerSubscription)
