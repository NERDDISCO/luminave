import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { repeat } from 'lit-html/directives/repeat.js'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'
import { ApolloQuery } from '@apollo-elements/lit-apollo'


// Create the Apollo Client
const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

// Compute graphql documents statically for performance
const query = gql`
  query scenes {
    getTimelineScenes {
      name
    }
  }
`

/*
 * Handle communication with the server
 */
class LuminaveServer extends ApolloQuery {

   constructor() {
     super()
     this.client = client
     this.query = query
   }

  static get properties() {
    return { venues: { type: Array } }
  }

  render() {
    const { data, error, loading } = this

    const { getTimelineScenes = [] } = data || {}

    return html`
      ${repeat(getTimelineScenes, scene => html`
        ${scene.name}
      `)}
    `
   }

  
}

customElements.define('luminave-server', LuminaveServer)
