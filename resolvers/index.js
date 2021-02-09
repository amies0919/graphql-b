const Query = require('./Query')
const Mutation = require('./Mutation')
const Photo = require('./Photo')
const User = require('./User')
const Subscription = require('./Subscription')
const resolvers = {
    Query,
    Mutation,
    Photo,
    User,
    Subscription
}
module.exports = resolvers
