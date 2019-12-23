const { ApolloServer, UserInputError, AuthenticationError,  gql } = require('apollo-server')
const uuid = require('uuid/v1')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'GraphQLLibraryBackend'

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb://localhost/graphql?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }  
  
  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token  
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      let search = {}
      // if(args.author) {
      //   result = result.filter(b => b.author === args.author)
      // }
      if(args.genre) {
        search = { genres: args.genre } 
      } 
      return Book.find( search )
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => {
       return Author.find({})
    },
    me: (root, args, { currentUser } ) => {
      return currentUser
    }
    },
  Book: {
    author: root => Author.findById(root.author)
  },
  Author: {
    bookCount: (root) =>
      Book.collection.countDocuments({ author: root._id})
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("addBook requires authentication")
      }
      let author = await Author.findOne({
        name: args.author
      })
      try {
        if(!author) {        
          author = new Author({ name: args.author })
          author = await author.save()
        }
        const book = new Book({ ...args, author: author.id })
        return await book.save()   
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("editAuthor requires authentication")
      }
      const author = await Author.findOne({
        name: args.name
      })
      if(!author) {
        throw new UserInputError(`Unknown author ${args.name}`, {
          invalidArgs: args,
        })

      }  
      return await Author.findByIdAndUpdate(author.id, {
        $set: { 
          born: args.setBornTo 
        }
      }, { new: true })
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username,
        favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
       })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("Invalid username or password")
      }
      const token = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(token, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(token.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
