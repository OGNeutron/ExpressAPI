const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PFive = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

let PFiveModel = mongoose.model('PFIVE', PFive);

module.exports = PFiveModel;