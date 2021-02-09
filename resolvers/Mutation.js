const { authorizeWithGithub } = require('../util.js')
const fetch = require('node-fetch')
const postPhoto = async (parent, args,{ db, currentUser, pubsub }) =>{
    if( !currentUser ){
        throw new Error('only an authorized user can post a photo')
    }
    var newPhoto = {
        ...args.input,
        userID: currentUser.githubLogin,
        created: new Date()
    }
    const { insertedIds } = await db.collection('photos').insert(newPhoto)
    console.log(insertedIds)
    newPhoto.id = insertedIds[0]
    pubsub.publish('photo-added', { newPhoto })
    return newPhoto
}
const githubAuth = async (parent, { code }, { db, pubsub })=>{
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
        pubsub.publish('user-added', { newUser: user })
    return { user, token: access_token }

}
const addFakeUsers = async (root, {count} , {db, pubsub}) => {
    var randomUserApi = `http://randomuser.me/api/?results=${count}`
    var {results} = await fetch(randomUserApi).then(res=>res.json())
    var users = results.map(r=>({
        githubLogin: r.login.username,
        name:`${r.name.first} ${r.name.last}`,
        avatar: r.picture.thumbnail,
        githubToken: r.login.sha1

    }))
    await db.collection('users').insert(users)

    let newUsers = await db.collection('users')
    .find()
    .sort({ _id: -1 })
    .limit(count)
    .toArray()
    newUsers.forEach(newUser=>pubsub.publish('user-added', { newUser }))
    return users
}

module.exports = {
    postPhoto,
    githubAuth,
    addFakeUsers
    
}