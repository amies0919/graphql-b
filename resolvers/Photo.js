const { users, tags } = require('./mock')
module.exports = {
    id: parent => parent.id || parent._id,
    url: parent => `http://test.com/img/${parent.id}.jpg`,
    postedBy: (parent, args, {db}) => {
        return db.collection('users').findOne({githubLogin: parent.userID})
    },
    taggedUsers: parent => tags.filter(tag => tag.photoID === parent.id)
        .map(tag => tag.userID)
        .map(userID => users.find(u => u.githubLogin === userID))
}