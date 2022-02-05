import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String): String!
        grades: [Int!]!
        add(numbers: [Float!]): Float!
        me: User!
        post: Post!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '2'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '3'
}]

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
            if(!args.query) {
                return users
            } else {
                return users.filter(user => user.name.toLowerCase() === args.query.toLowerCase())
            }
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false,
                author: '1'
            }
        }
        
    },
    Post: {
        author(parent, args, ctx, info) {
           return users.find((user) => user.id === parent.author) 
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