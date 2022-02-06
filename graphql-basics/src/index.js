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
        comments(query: String): [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]
        comments: [Comment!]
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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

const comments = [{
    id: '21',
    text: 'Program',
    author: '1',
    post: '10'
},
{
    id: '22',
    text: 'Programming Music',
    author: '2',
    post: '11'
},
{
    id: '23',
    text: 'Programming Dance',
    author: '3',
    post: '12'
}
]

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
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false,
                author: '1'
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
            return [90, 54, 24, 53]
        },
        add(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0
            } else {
                return args.numbers.reduce((acc, val) => acc + val, 0);
            }
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
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
        comments(parent, args, ctx, info) {
            return comments
        }

    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.author)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.post === parent.id)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => post.author === parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id)
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
        },
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post)
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