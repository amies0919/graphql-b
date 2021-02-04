const { authorizeWithGithub } = require('../util.js')
var _id = 0
var { photos } = require('./mock')
const postPhoto = (parent, args) =>{
    var newPhoto = {
        id: _id++,
        ...args.input
    }
    photos.push(newPhoto)
    return newPhoto
}
const githubAuth = async (parent, { code }, { db })=>{
    let {
        message,
        access_token,
        avatar_url,
        login,
        name
    } = await authorizeWithGithub({
        client_id: 'f6faa786266f15ca6fa9',
        client_secret: 'e27e2c15ba8b55d5b098a6a880b009f3f9fba545',
        code
    })
    if(message){
        throw new Error(message)
    }
    let latestUserInfo = {
        name,
        githubLogin: login,
        githubToken: access_token,
        avatar: avatar_url
    }
    const { ops:[user] } = await db
        .collection('users')
        .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true })
    return { user, token: access_token }

}
module.exports = {
    postPhoto,
    githubAuth

}