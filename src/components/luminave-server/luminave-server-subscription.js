
import { LitElement, html, css } from 'lit-element/lit-element.js'
import gql from 'graphql-tag'
import { ApolloSubscription } from '@apollo-elements/lit-apollo'

// Compute graphql documents statically for performance
const subscription = gql`
  subscription {
    # timelineScenesUpdated {
    #   name
    # }

    rawUpdated {
      data
    }
  }
`

/**
 * Subsribe to the luminave-server to get updates
 */
class LuminaveServerSubscription extends ApolloSubscription {
  
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
      console.log(this.data)
      // this.scenes = this.data.timelineScenesUpdated.map(scene => scene.name)
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

  render() {
    const { error } = this

    return html`
    ${error}
    `
  }
}

customElements.define('luminave-server-subscription', LuminaveServerSubscription)
