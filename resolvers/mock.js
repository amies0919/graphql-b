var users = [
    { "githubLogin": "mHattrup", "name": "Mike Hattrup" },
    { "githubLogin": "gPlake", "name": "Mike 2" },
    { "githubLogin": "sSchmidt", "name": "Mike 3" }
]
var photos = [
    {
        "id": "1",
        "name": "vvvvv3",
        "description": "bbbbbbbddddvvvvvv",
        "url": "http://test.com/img/0.jpg",
        "category": "PORTRART",
        "githubUser": "gPlake"
    },
    {
        "id": "2",
        "name": "vvvvv3",
        "description": "bbbbbbbddddvvvvvv",
        "url": "http://test.com/img/1.jpg",
        "category": "PORTRART",
        "githubUser": "sSchmidt"
    }
]
var tags = [
    {
        "photoID": "1",
        "userID": "gPlake"
    },
    {
        "photoID": "2",
        "userID": "sSchmidt" 
    },
    {
        "photoID": "2",
        "userID": "mHattrup"
    },
    {
        "photoID": "2",
        "userID": "gPlake"
    }
]
module.exports = {
    users,
    photos,
    tags
}