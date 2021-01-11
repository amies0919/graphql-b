const { ApolloServer } = require('apollo-server')
const typeDefs = `
    enum PhotoCategory{
        SELFIE
        PORTRART
    }
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
    }
    input PostPhotoInput {
        name: String!
        category: PhotoCategory=PORTRART
        description: String
    }
    type Query {
        totalPhotos: Int!,
        allPhotos: [Photo!]!
    }
    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }
    type User {
        githubLogin: ID!
        name: String
        avatar: String
        postedPhotos: [Photo!]!
    }
`
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
const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.listen().then(({url}) => console.log('GraphQL Service running on ${url}'))