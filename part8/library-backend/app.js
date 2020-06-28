const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String]
    id: ID!
  }

  type Author {
    name: String!
    born: String
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (b) => b.genres.includes(args.genre) && b.author === args.author
        )
      }

      if (args.author) {
        return books.filter((b) => b.author === args.author)
      }

      if (args.genre) {
        return books.filter((b) => b.genres.includes(args.genre))
      }

      return books
    },
    allAuthors: () => authors,
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: (root) => {
      return books.filter((b) => b.author == root.name).length
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      if (!authors.find((a) => a.name === args.author)) {
        console.log('pass name')
        authors = authors.concat({ name: args.author, id: uuid() })
      }

      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)

      if (!author) {
        return null
      }

      const updatedAuthor = { ...args, born: args.setBornTo }
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))
      return updatedAuthor
    },
  },
}

module.exports = { typeDefs, resolvers }
