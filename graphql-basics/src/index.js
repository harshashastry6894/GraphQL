import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        me: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
`

// Resolvers
const resolvers = {
    Query: {
       me() {
           return {
               id: '23134',
               name: 'John',
               email: 'john@example.com',
               age: 30
           }
       }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server started')
})