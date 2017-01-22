const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    }
})

let Users = module.exports = mongoose.model('User', User);