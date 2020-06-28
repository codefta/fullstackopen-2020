const { ApolloServer, gql } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb://127.0.0.1:27017/library-graphql'
console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: [String]): [Book!]!
    allAuthors: [Author!]!
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
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.genre) {
        return Book.find({})
      }

      return Book.find({ genres: { $in: args.genre } })
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    bookCount: async (root) => {
      const books = await Books.find({ author: root._id })

      return books.length
    },
  },
  Book: {
    author: async (root) => {
      const book = await Book.findOne({ name: root.name }).populate('author')

      return {
        name: book.author.name,
        born: book.author.born,
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let book = {
        title: args.title,
        published: args.published,
        genres: args.genres,
      }

      const authorFinded = await Author.findOne({ name: args.author })

      if (!authorFinded) {
        const author = new Author({
          name: args.author,
        })

        const authorSaved = await author.save()

        book = new Book({ ...book, author: authorSaved._id })

        await book.save()

        return book
      } else {
        book = new Book({ ...book, author: authorFinded._id })
        await book.save()
        return book
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }
      author.born = args.setBornTo

      await author.save()

      return author
    },
  },
}

module.exports = { typeDefs, resolvers }
