const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ListingSchema = new Schema ({
    propertyName: {
        type: String,
        unique: true
    },
    email: {
        type: String
    },
    dateAvailable: String,
    address: String,
    description: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
})

const Listings = mongoose.model('Listings', ListingSchema)
module.exports = Listings