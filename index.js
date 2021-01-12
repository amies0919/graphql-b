const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { readFileSync } = require('fs')
const typeDefs = readFileSync('./typeDefs.graphql','utf8')
var _id = 0
var photos = [
    {
        "id": "0",
        "name": "vvvvv3",
        "description": "bbbbbbbddddvvvvvv",
        "url": "http://test.com/img/0.jpg",
        "category": "PORTRART",
        "githubUser":"user1"
    },
    {
        "id": "1",
        "name": "vvvvv3",
        "description": "bbbbbbbddddvvvvvv",
        "url": "http://test.com/img/1.jpg",
        "category": "PORTRART",
        "githubUser": "user2"
    }
]
var users = [
    {"githubLogin":"mHattrup","name":"Mike Hattrup"},
    { "githubLogin": "user1", "name": "Mike 2" },
    { "githubLogin": "user2", "name": "Mike 3" }
]
const resolvers = {
    Query: {
        totalPhotos: ()=> photos.length,
        allPhotos: ()=> photos
    },
    Mutation: {
        postPhoto(parent, args) {
            var newPhoto = {
                id: _id++,
                ...args.input
            }
            photos.push(newPhoto)
            return newPhoto
        }
    },
    Photo: {
        url: parent=> `http://test.com/img/${parent.id}.jpg`,
        postedBy: parent=> {
            return users.find(u => u.githubLogin === parent.githubUser)
        }
    },
    User: {
        postedPhotos: parent => {
            return photos.filter(p=> p.githubUser === parent.githubLogin)
        }
    }
}
const app = express()
const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.applyMiddleware({ app })
app.get('/',(req, res)=>res.send('Welcome to the photoShare API'))
app.get('/playground', expressPlayground({ endpoint:'/graphql' }))
app.listen({port: 4000},() => console.log(`GraphQL Service running @ http://localhost:4000${server.graphqlPath}`))