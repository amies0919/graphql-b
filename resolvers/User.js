var { photos, tags } = require('./mock')
module.exports = {
    postedPhotos: parent => {
        return photos.filter(p => p.githubUser === parent.githubLogin)
    },
    inPhotos: parent => tags.filter(tag => tag.userID === parent.id)
        .map(tag => tag.photoID)
        .map(photoID => photos.find(p => p.id === photoID))
}