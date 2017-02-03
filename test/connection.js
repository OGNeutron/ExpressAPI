const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
    mongoose.connect('mongodb://localhost/EBEApi');
    mongoose.connection.once('open', () => {
        console.log('Connection has been made');
        done();
    }).on('error', error => {
        console.log('Connection Error: ', error);
    })
})

beforeEach(done => {
    mongoose.connection.collections.tests.drop(() => {
        done();
    })
})