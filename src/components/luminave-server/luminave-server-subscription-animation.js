
import { html, css } from 'lit-element/lit-element.js'
import gql from 'graphql-tag'
import { ApolloSubscription } from '@apollo-elements/lit-apollo'
import { setAnimation, addAnimation } from '../../actions'
import { getAnimation } from '../../selectors/index.js'
import { store } from '../../reduxStore.js'
import { normal } from '../../utils/animation-effects/normal.js'
import { fade } from '../../utils/animation-effects/fade.js'
import { shake } from '../../utils/animation-effects/shake.js'
import { strobe } from '../../utils/animation-effects/strobe.js'
import { oscillate } from '../../utils/animation-effects/oscillate.js'

// Compute graphql documents statically for performance
const subscription = gql`
  subscription {
    animationUpdated {
      dimmer
      duration 
      color
      action
      actionStrength
      externalId
    }
  }
`

/**
 * Subsribe to the luminave-server to get updates
 */
class LuminaveServerSubscriptionAnimation extends ApolloSubscription {

  constructor() {
    super()

    // @TODO: This has to be moved into state, otherwise it will be wrong in some cases
    this.lastValues = { dimmer: 0 }
  }
  
  static get properties() {
    return {
      client: { type: Object },
      animationId: { type: String }
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
      const animation = this.data.animationUpdated

      const _animation = getAnimation(store.getState(), { animationId: animation.externalId })

      // Create new animation if animation doesn't exist yet
      if (_animation === undefined) {
        this._addAnimation(animation)
      }

      this._setAnimation(animation)
    }

    return (
      this.loading !== null ||
      this.data ||
      this.error
    )
  }

  updated(changedProps) {
    // Create a new subscription if the client was set
    if (changedProps.has('client')) {
      this.subscription = subscription
    }
  }

  _addAnimation(animation) {
    const id = animation.externalId
    const name = animation.externalId
    const { duration } = animation

    this.animationId = id
  
    // Create the animation
    store.dispatch(addAnimation({
      id, 
      keyframes: {},
      duration,
      name
    }))

    const { animationId } = this

    // Inform parent that an animation was added
    this.dispatchEvent(new CustomEvent('added-animation', { detail: { animationId } }))
  }

  /**
   * Set the data of the animation based on the incoming data
   * 
   * @param {Object} data - The data from luminave-server
   */
  _setAnimation(data) {

    const { dimmer, color, action, actionStrength } = data
    let { duration } = data
    let keyframes = normal({ 
      dimmer, 
      color 
    })

    switch (action) { 
      case 'fade':
        keyframes = fade({
          startDimmer: this.lastValues.dimmer,
          endDimmer: dimmer,
          color
        })
        break

      case 'shake':
        // Loop the same 5 seconds of random values
        duration = 5000
        keyframes = shake({
          baseStrength: 30,
          actionStrength, 
          dimmer, 
          color,
          duration
        })
        break

      case 'strobe':
        // @TODO: Use the strobe effect of the fixture instead?
        keyframes = strobe({
          baseStrength: 50,
          actionStrength, 
          dimmer, 
          color
        })
        break

      case 'oscillate':
        keyframes = oscillate({
          baseStrength: 10,
          actionStrength, 
          dimmer, 
          color
        })
        break
    
      default:
        break
    }

    store.dispatch(setAnimation({
      id: this.animationId,
      keyframes,
      duration
    }))

    // Save the last value
    this.lastValues = { dimmer }
  }

  render() {
    const { error } = this

    return html`
    ${error}
    `
  }
}

customElements.define('luminave-server-subscription-animation', LuminaveServerSubscriptionAnimation)
