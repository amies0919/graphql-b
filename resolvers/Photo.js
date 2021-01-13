const { users, tags } = require('./mock')
module.exports = {
    url: parent => `http://test.com/img/${parent.id}.jpg`,
    postedBy: parent => {
        return users.find(u => u.githubLogin === parent.githubUser)
    },
    taggedUsers: parent => tags.filter(tag => tag.photoID === parent.id)
        .map(tag => tag.userID)
        .map(userID => users.find(u => u.githubLogin === userID))
}