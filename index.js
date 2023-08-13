const { ApolloServer } = require('apollo-server')

// MEMO: これはスキーマを定義している
const typeDefs = `
  type Query {
    totalPhotos: Int!
  }

  type Mutation {
    postPhoto(name: String! description: String): Boolean!
  }
`

var photos = []

const resolvers = {
  Query: {
    totalPhotos: () => photos.length
  },
  Mutation: {
    // 第二引数にnameとdescriptionが入っている
    postPhoto(parent, args) {
      photos.push(args)
      return true
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({url}) => console.log(`GraphQL Service runnning on ${url}`))