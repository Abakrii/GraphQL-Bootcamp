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
    name : "Hamdy",
    email: "Hamdy@Awstreams.com"
}]


// Type definitions (schema)
const typeDefs = `
    type Query {
        users (query: String): [User!]! 
        me: User!
        post: Post!
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
`

// Resolvers
const resolvers = {
    Query: {
        users(parent , ctx , args , info){
            
                if(!args.query){
                    return users
                }

            return users.filter((user)=>{
                return user.name.toLowerCase.include(args.query.toLowerCase())
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