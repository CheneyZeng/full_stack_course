const { GraphQLError } = require("graphql")
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})
      let filteredBooks
      let author
      if (args.author && args.genre) {
        author = await Author.findOne({ name: args.author })
        filteredBooks = await Book.find({ 
          author: author.id,
          genres: { $in: [args.genre] }
        })
        return filteredBooks
      }
      if (args.author) {
        author = await Author.findOne({ name: args.author })
        filteredBooks = await Book.find({ author: author.id })
        return filteredBooks
      }
      if (args.genre) {
        filteredBooks = await Book.find({
          genres: { $in: [args.genre]}
        })
        return filteredBooks
      }
      return books
    },
    allAuthors: async (root, args) => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const foundAuthor = await Author.findOne({ name: args.author })
      if (!foundAuthor) {
        const author = new Author({ name: args.author, bookCount: 1 })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError("Error saving author", {
            extensions: {
            code: "BAD_USER_INPUT",
            error
            }
          })
        }
      } else {
        foundAuthor.bookCount += 1
        try {
          await foundAuthor.save()
        } catch (error) {
          throw new GraphQLError("Error saving author", {
            extensions: {
            code: "BAD_USER_INPUT",
            error
            }
          })
        }
      }

      const book = new Book({ ...args, author: foundAuthor })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError("Error saving book", {
          extensions: {
          code: "BAD_USER_INPUT",
          error
          }
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book }) 
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        return await author.save()
      } catch (error) {
        throw new GraphQLError("Error saving author", {
          extensions: {
          code: "BAD_USER_INPUT",
          error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        return await user.save()
      } catch (error) {
        throw new GraphQLError("Error creating user", {
          extensions: {
          code: "BAD_USER_INPUT",
          error
          }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET), favoriteGenre: user.favoriteGenre
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers