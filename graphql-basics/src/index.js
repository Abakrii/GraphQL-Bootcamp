import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo User Data

const users =[{
    id : '1',
    name : "AbdelrahmanB",
    email: "Abdelrahmansalembakry@gmail.com",
    age: 27,

},{
    id : "2",
    name :"Sarah",
    email : "sara"
},{
    id : "3",
    name : "fil",
    email: "A@fil.com"
}]

// Demo Posts Data

const posts =[{
    id : "1",
    title : "graphql",
    body : "this is the first Post",
    published : true
},{
    id: "2",
    title : "Prisma",
    body : "this is the secound post",
    published : true

},{
    id : "3",
    title : "react",
    body: "postingggs",
    published: false
}]


// Type definitions (schema)
const typeDefs = `
    type Query {
        users (query: String): [User!]! 
        me: User!
        post: Post!
        posts (query :String) : [Posts!]!    
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
    }

    type Posts {
        id : ID!
        title : String!
        body: String!
        published : Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        posts(parent , args , ctx , info){
                if(!args.query){
                    return posts
                }
                return posts.filter((post)=>{
                    return (
                    post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                      post.body.toLowerCase().includes(args.query.toLowerCase())
                )})

        },

        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
              //  return user.name.toLowerCase().includes(args.query.toLowerCase())
                return user.id.includes(args.query)
            })
        },
        
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com'
            }
        }, 
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})