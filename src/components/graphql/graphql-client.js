import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { persistCache } from 'apollo-cache-persist'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'

let client

export async function getClient({ url, reconnect }) {

  // Client already exists
  if (client) {
    return client
  }

  console.log('Create new GraphQL client for', url)

  // WebSocket connection
  const websocketLink = new WebSocketLink({ 
    uri: url, 
    options: {
      reconnect
    } 
  })

  // Stitch different links together
  const link = ApolloLink.from([
    websocketLink
  ])

  // Cache
  const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)
  await persistCache({
    cache, 
    storage: window.localStorage 
  })

  // Create a new client
  client = new ApolloClient({ cache, link, ssrForceFetchDelay: 100, debug: true })

  return client
}
