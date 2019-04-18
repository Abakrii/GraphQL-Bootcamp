import { GraphQLServer } from 'graphql-yoga'

import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/Post";
import Comment from "./resolvers/Comment";
import User from "./resolvers/User";
// Scalar types - String, Boolean, Int, Float, ID

// Demo user data



// Resolvers
const resolvers = {
    Query,
    Mutation,
    Post,
    Comment,
    User,
}

const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers,
    context:{
        db   
    }
})

server.start(() => {
    console.log('The server is up!')
})