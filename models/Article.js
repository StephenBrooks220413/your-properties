const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: String
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
})

const Articles = mongoose.model('Articles', ArticleSchema)
module.exports = Articles