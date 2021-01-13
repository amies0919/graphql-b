var { photos } = require('./mock')
module.exports = {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
}