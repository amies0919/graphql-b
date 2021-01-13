var _id = 0
var { photos } = require('./mock')
module.exports = {
    postPhoto (parent, args) {
        var newPhoto = {
            id: _id++,
            ...args.input
        }
        photos.push(newPhoto)
        return newPhoto
    }
}