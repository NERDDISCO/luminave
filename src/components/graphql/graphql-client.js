import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { persistCache } from 'apollo-cache-persist'
import { withClientState } from 'apollo-link-state'
import ApolloClient from 'apollo-client'

import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import compose from 'crocks/helpers/compose' 
import objOf from 'crocks/helpers/objOf'
import fanout from 'crocks/helpers/fanout'
import isSame from 'crocks/predicates/isSame'
import merge from 'crocks/Pair/merge'
import propOr from 'crocks/helpers/propOr'


// const { host } = location

const host = 'localhost:4000'

// Set up the WebSocket Link for Subscriptions
function createWsLink() {
  const protocol = host.includes('localhost') ? 'ws' : 'wss'
  const options = { reconnect: true }
  const uri = `${protocol}://${host}/graphql`
  console.log(uri)
  return new WebSocketLink({ uri, options })
}

// Set up the HTTP Link for Queries and Mutations
function createHttpLink() {
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const uri = `${protocol}://${host}/graphql`
  return new HttpLink({ uri })
}

// isWsOperation :: { query } -> Boolean
const getKind = propOr(null, 'kind')
const getOperation = propOr(null, 'operation')
const getQuery = propOr(null, 'query')
const isOperation = compose(isSame('OperationDefinition'), getKind)
const isSubscription = compose(isSame('subscription'), getOperation)
const both = (a, b) => a && b
const isWsOperation = compose(
  merge(both),
  fanout(isOperation, isSubscription),
  getMainDefinition,
  getQuery
)

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)

const resolverFor = name => (_, args, { cache }) => {
  cache.writeData({ data: objOf(name, args[name]) })
  return args[name]
}

const stateLink = withClientState({
  cache,
  defaults: {
    nick: null,
    id: null,
    status: navigator.onLine ? 'ONLINE' : 'OFFLINE',
  },
  resolvers: {
    Mutation: {
      nick: resolverFor('nick'),
      id: resolverFor('id'),
      status: resolverFor('status'),
    }
  },
})

const terminalLink = split(isWsOperation, createWsLink(), createHttpLink())

const link = ApolloLink.from([
  stateLink,
  terminalLink,
])

let client
export async function getClient() {
  if (client) return client
  await persistCache({ cache, storage: localStorage })
  client = new ApolloClient({ cache, link, ssrForceFetchDelay: 100 })
  return client
}
