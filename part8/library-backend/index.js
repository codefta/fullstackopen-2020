const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers, context } = require('./app')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen().then(({ url, subscriptionUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionUrl}`)
})
