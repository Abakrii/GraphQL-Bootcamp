import uuidv4 from 'uuid/v4'
const Mutation = {
    createUser(parent, args, {db}, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)

        if (emailTaken) {
            throw new Error('Email taken')
        }
        
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)

        return user
    },
    deleteUser(parent, args, {db}, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('User not found')
        }

        const deletedUsers = db.users.splice(userIndex, 1)

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if (match) {
                comments = db.comments.filter((comment) => comment.post !== post.id)
            }

            return !match
        })
        comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    updateUser(parent  , args , { db }, info){

        const {id , data} = args

        const user = db.users.find((user)=> user.id === id)

        if(!user){
            throw new Error("User Not Found")
        }

        if(typeof data.email === "string") {
            const emailTaken = db.users.some((user)=> user.email === data.email)

            if (emailTaken) {
                throw new Error("Email Taken!")
            }

            user.email = data.email

        }

        if(typeof data.name === "string"){
            user.name = data.name
        }

        if( typeof data.age !== "undefined") {
            user.age = data.age
        }

        return user
    },
    createPost(parent, args, {db}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        if (!userExists) {
            throw new Error('User not found')
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        return post
    },

    updatePost(parent , args, {db}, info){
        const {id , data} = args
        //get the post by id
        const post = db.posts.find((post)=> post.id === id)
        //if post not found return this error
        if(!post){
            throw new Error("Post Not Found")
        }

        if(typeof data.title === "string") {
            const emailTaken = db.users.some((user)=> user.email === data.email)
            post.title = data.title
        }

        if(typeof data.body === "string") {
            post.body = data.body
        }

        if(typeof data.published === "boolean") {
            post.published = data.published
        }

        return post


    },

    deletePost(parent , args , {db} , info) {
        const postIndex = db.posts.findIndex((post)=> post.id===args.id)

        if(postIndex ===-1){
            throw new Error("Post Not Found")
        }

        const deletedPosts = db.posts.splice(postIndex , 1)
        
        //delete all comments belw the deleted post
        db.comments = db.comments.filter((comment)=>comment.post !==args.id)

        return deletedPosts[0]

    },
    createComment(parent, args, {db}, info){
        const userExists = db.users.some((user) => user.id === args.data.author)
        const postExists = db.posts.some((post) => post.id === args.data.post && post.published)

        if (!userExists || !postExists) {
            throw new Error('Unable to find user and post')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)

        return comment
    },
    updateComment(parent , args , { db } , info){
        const {id , data } = args;

        const comment = db.comments.find((comment)=> comment.id === id )

        if(!comment){
            throw new Error("Comment Not Found")
        }
        if(typeof data.text === "string") {
            comment.text = data.text
        }

        return comment

    },
     deleteComment(parent , {db} , info , args) {
         const commentIndex = db.comments.findIndex((comment)=> comment.id ===args.id)

         if(commentIndex === -1){
             throw new Error ("Comment Not Found")
         }

         const deletedCommment = db.comments.splice(commentIndex , 1)
         return deletedCommment[0]

    },
}


export { Mutation as default }