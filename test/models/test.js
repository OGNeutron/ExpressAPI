const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TestTwo = new Schema({
    title: {
        type:String,
        required: true,
    },
    data: {
        type: Date,
        default: Date.now
    }
})

let Test = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    testTwo: [TestTwo]
})

const testmodel = mongoose.model('test', Test);

module.exports = testmodel;