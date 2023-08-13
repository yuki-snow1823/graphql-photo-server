const { ApolloServer } = require('apollo-server')

// MEMO: これはスキーマを定義している
const typeDefs = `
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(name: String! description: String): Photo!
  }
`

var _id = 0
var photos = []

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    // 第二引数にnameとdescriptionが入っている
    postPhoto(parent, args) {
      var newPhoto = {
        id: _id++,
        ...args
      }
      photos.push(args)
      return newPhoto
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