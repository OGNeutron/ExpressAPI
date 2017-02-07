const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let Post = mongoose.Schema({
    content: {
        type:String,
    },
    date: {
        type:Date,
        default: Date.now,
    }
})

let User = mongoose.Schema({
    id: {
        type:String,
        index: true
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String,
        street: String,
        town: String,
        nation: String
    },
    posts: [Post]
})

let Users = module.exports = mongoose.model('User', User);