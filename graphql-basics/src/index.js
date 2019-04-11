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
    published : true, 
    author : "1",
    commentsInPost: "10"
},{
    id: "2",
    title : "Prisma",
    body : "this is the secound post",
    published : true,
    author :"1",
    commentsInPost: "20"

},{
    id : "3",
    title : "react",
    body: "postingggs",
    published: false,
    author : "2" ,
    commentsInPost: "30"
}]

const comments =[{
    id : "10",
    textField : "first",
    author : "1",
    postAddress:"1"
},{
    id : "20",
    textField : "secound",
    author:"1",
    postAddress:"2"
},{
    id : "30",
    textField : "Third",
    author: "2",
    postAddress:"2"
},{
    id : "40",
    textField : "Forth",
    author: "3",
    postAddress:"3"
    
}]


// Type definitions (schema)
const typeDefs = `
    type Query {
        users (query: String): [User!]! 
        me: User!
        post: Post!
        posts (query :String) : [Post!]!    
        comments : [Comment!]!
    }       

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts :[Post!]!
        comments: [Comment!]
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author : User!
        commentsInPost : Comment!
    }
    type Comment {
        id : ID!
        textField : String!
        author : User!
        postAddress : Post!
    }
`

// Resolvers
const resolvers = {
    Query: {
        comments(parent , args, ctx, info){
            return comments

        }
        ,
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
    },
    Post: {
        author(parent , args , ctx , info){
            return users.find((user)=>{
                    return user.id === parent.author
            })

        },
        commentsInPost(parent , args, ctx , info){
            return comments.find((comment)=>{
                return comment.id === parent.commentsInPost
        })
        }
        
    },
    User: {
        posts(parent, args, ctx , info){
            return posts.filter((post)=>{
                return post.author ===parent.id
            })
        },
        comments(parent , args , ctx , info){
            return comments.filter((comment)=>{
                return comment.author === parent.id
            })
        }
    },
    Comment:{
        author(parent , args, ctx , info){
            return users.find((user)=> {
                return user.id === parent.author

            })
           
        },
        postAddress(parent,args,ctx,info) {
            return posts.find((post)=>{
                return post.id === parent.postAddress
            })
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