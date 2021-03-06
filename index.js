const { ApolloServer, PubSub } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { readFileSync } = require('fs')
const typeDefs = readFileSync('./typeDefs.graphql','utf8')
const resolvers = require('./resolvers')
const { MongoClient }  = require('mongodb')
require('dotenv').config()
//process.env.xxx
const { createServer } = require('http')
const path = require('path')
const depthLimit = require('graphql-depth-limit')


async function start() {
    const app = express()
    app.use('/img/photos', express.static(path.join(__dirname, 'assets', 'photos')))
    const DB_HOST = process.env.DB_HOST
    const client = await MongoClient.connect(DB_HOST, {useNewUrlParser:true,useUnifiedTopology: true})
    const db = client.db()
    // const context = { db }

    const pubsub = new PubSub()
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        validationRules:[depthLimit(5)],
        engine:true,
        context: async ({ req, connection }) => {
            const githubToken = req?req.headers.authorization:connection.context.Authorization
            const currentUser = await db.collection('users').findOne({ githubToken }) 
            console.log(currentUser)
            return { db, currentUser, pubsub}
        }
    })
    server.applyMiddleware({ app })
    app.get('/', (req, res) => res.send('Welcome to the photoShare API'))
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
    // app.listen({ port: 4000 }, () => console.log(`GraphQL Service running @ http://localhost:4000${server.graphqlPath}`))
    const httpServer = createServer(app)
    server.installSubscriptionHandlers(httpServer)
    httpServer.timeout = 5000
    httpServer.listen({ port: 4000 }, () => console.log(`GraphQL Service running @ http://localhost:4000${server.graphqlPath}`))
}
start()
