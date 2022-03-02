const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReviewSchema = new Schema ({
    title: {
        type: String
    },
    message: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    rating: String
})

const Reviews = mongoose.model('Reviews', ReviewSchema)
module.exports = Reviews