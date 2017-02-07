const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let Post = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    content: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        default: Date.now,
    }
})

const PostModel = module.exports = mongoose.model('Post', Post);