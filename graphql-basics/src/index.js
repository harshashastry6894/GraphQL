import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String): String!
        me: User!
        grades: [Int!]!
        add(numbers: [Float!]): Float!
        users(query: String): [User!]!
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
        },
        greeting(parent, args, ctx, info) {
            if (args.name) {
                return `Hello ${args.name}`
            } else {
                return 'Hello'
            }
        },
        grades(parent, args, ctx, info) {
            return [90,54,24,53]
        },
        add(parent, args, ctx, info) {
            if(args.numbers.length === 0) {
                return 0
            } else {
                return args.numbers.reduce((acc, val) => acc + val, 0);
            }
        },
        users(parent, args, ctx, info) {
            const users = [{
                id: '1',
                name: 'John',
                email: 'john@example.com',
                age: 18
            },
            {
                id: '2',
                name: 'Harsha',
                email: 'Harsha@example.com',
                age: 22
            },
            {
                id: '3',
                name: 'Mike',
                email: 'Mike@example.com',
                age: 22
            }
            ]
            
            if(!args.query) {
                return users
            } else {
                return users.filter(user => user.name.toLowerCase() === args.query.toLowerCase())
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