// import { GraphQLServer } from 'graphql-yoga'
// import uuidv4 from "uuid/v4";
// import { AddArgumentsAsVariables } from 'graphql-tools';
// // Scalar types - String, Boolean, Int, Float, ID

// // Demo User Data

// const users =[{
//     id : '1',
//     name : "AbdelrahmanB",
//     email: "Abdelrahmansalembakry@gmail.com",
//     age: 27,

// },{
//     id : "2",
//     name :"Sarah",
//     email : "sara"
// },{
//     id : "3",
//     name : "fil",
//     email: "A@fil.com"
// }]

// const test = [{id:"" ,name: "" , email:"" , age:"" }]

// // Demo Posts Data

// const posts =[{
//     id : "1",
//     title : "graphql",
//     body : "this is the first Post",
//     published : true, 
//     author : "1",
//     commentsInPost: "10"
// },{
//     id: "2",
//     title : "Prisma",
//     body : "this is the secound post",
//     published : true,
//     author :"1",
//     commentsInPost: "20"

// },{
//     id : "3",
//     title : "react",
//     body: "postingggs",
//     published: false,
//     author : "2" ,
//     commentsInPost: "30"
// }]

// const comments =[{
//     id : "10",
//     textField : "first",
//     author : "1",
//     postAddress:"1"
// },{
//     id : "20",
//     textField : "secound",
//     author:"1",
//     postAddress:"2"
// },{
//     id : "30",
//     textField : "Third",
//     author: "2",
//     postAddress:"2"
// },{
//     id : "40",
//     textField : "Forth",
//     author: "3",
//     postAddress:"3"
    
// }]


// // Type definitions (schema)
// const typeDefs = `
//     type Query {
//         users (query: String): [User!]! 
//         me: User!
//         post: Post!
//         posts (query :String) : [Post!]!    
//         comments : [Comment!]!
//     }       

//     type Mutation {
//         createUser(name: String! , email: String! , age: Int) : User!
//         createPost(title: String!, body: String!, published: Boolean!, author: ID!) : Post!
//         createComment(textField: String!, author: ID!, postAddress: ID!) : Comment!
//     }

//     type User {
//         id: ID!
//         name: String!
//         email: String!
//         age: Int
//         posts :[Post!]!
//         comments: [Comment!]
//     }

//     type Post {
//         id: ID!
//         title: String!
//         body: String!
//         published: Boolean!
//         author : User!
//         commentsInPost : Comment!
//     }
//     type Comment {
//         id : ID!
//         textField : String!
//         author : User!
//         postAddress : Post!
//     }
// `

// // Resolvers
// const resolvers = {
//     Query: {
//         comments(parent , args, ctx, info){
//             return comments

//         }
//         ,
//         posts(parent , args , ctx , info){
//                 if(!args.query){
//                     return posts
//                 }
//                 return posts.filter((post)=>{
//                     return (
//                     post.title.toLowerCase().includes(args.query.toLowerCase()) ||
//                       post.body.toLowerCase().includes(args.query.toLowerCase())
//                 )})

//         },

//         users(parent, args, ctx, info) {
//             if (!args.query) {
//                 return users
//             }

//             return users.filter((user) => {
//               //  return user.name.toLowerCase().includes(args.query.toLowerCase())
//                 return user.id.includes(args.query)
//             })
//         },
        
//         me() {
//             return {
//                 id: '123098',
//                 name: 'Mike',
//                 email: 'mike@example.com'
//             }
//         }, 
//         post() {
//             return {
//                 id: '092',
//                 title: 'GraphQL 101',
//                 body: '',
//                 published: false
//             }
//         }
//     },
//     Mutation:{
//         createUser(parent , args , ctx , info){
//             const emailTaken = users.some((user)=> user.email === args.email);
//             const nameTaken = users.some((user)=> user.name === args.name);
//             // if(emailTaken || nameTaken) {
//                 if(emailTaken){
//                 throw new Error('Email taken.')}
//                 // if (nameTaken){
//                 //     throw new Error('UserNAME taken.')}
                
//             //}

//             const user ={
//                 id: uuidv4(),
//                 name: args.name,
//                 email: args.email,
//                 age: args.age
//             }

//             users.push(user)

//             return user

//         },
//         createPost(parent, args, ctx, info) {
//             const UserExists = users.some((user)=>user.id === args.author )
            
//             if(!UserExists){
//                 throw new Error("user Not Found")
//             }

//             const post ={
//                 id: uuidv4(),
//                 title: args.title,
//                 body: args.body,
//                 published: args.published,
//                 author: args.author
                
//             }

//             posts.push(post)

//             return post
//         },
//         createComment(parent , args, ctx, info) { 

//             const userExists = users.some((user)=>user.id ===args.author)
//             const postExists = posts.some((post)=> post.id === args.post && post.published)

//             if(!userExists || !postExists){

//                 throw new Error("Email Taken")
           
//         }
//         const comment ={
//             id: uuidv4(),
//             textField: args.textField,
//             author: args.author,
//             post: args.postAddress
            
//         }
//           comments.push(comment)
//           return comment

//         }
//     },
//     Post: {
//         author(parent , args , ctx , info){
//             return users.find((user)=>{
//                     return user.id === parent.author
//             })

//         },
//         commentsInPost(parent , args, ctx , info){
//             return comments.find((comment)=>{
//                 return comment.id === parent.commentsInPost
//         })
//         }
        
//     },
//     User: {
//         posts(parent, args, ctx , info){
//             return posts.filter((post)=>{
//                 return post.author ===parent.id
//             })
//         },
//         comments(parent , args , ctx , info){
//             return comments.filter((comment)=>{
//                 return comment.author === parent.id
//             })
//         }
//     },
//     Comment:{
//         author(parent , args, ctx , info){
//             return users.find((user)=> {
//                 return user.id === parent.author

//             })
           
//         },
//         postAddress(parent,args,ctx,info) {
//             return posts.find((post)=>{
//                 return post.id === parent.postAddress
//             })
//         }
//     }
// }

// const server = new GraphQLServer({
//     typeDefs,
//     resolvers
// })

// server.start(() => {
//     console.log('The server is up!')
// })

import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
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
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: true,
    author: '2'
}]

const comments = [{
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '3',
    post: '10'
}, {
    id: '103',
    text: 'Glad you enjoyed it.',
    author: '1',
    post: '10'
}, {
    id: '104',
    text: 'This did no work.',
    author: '2',
    post: '11'
}, {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '1',
    post: '11'
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
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
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.email)

            if (emailTaken) {
                throw new Error('Email taken')
            }
            
            const user = {
                id: uuidv4(),
                ...args
            }

            users.push(user)

            return user
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.author)

            if (!userExists) {
                throw new Error('User not found')
            }

            const post = {
                id: uuidv4(),
                ...args
            }

            posts.push(post)

            return post
        },
        createComment(parent, args, ctx, info){
            const userExists = users.some((user) => user.id === args.author)
            const postExists = posts.some((post) => post.id === args.post && post.published)

            if (!userExists || !postExists) {
                throw new Error('Unable to find user and post')
            }

            const comment = {
                id: uuidv4(),
                ...args
            }

            comments.push(comment)

            return comment
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
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