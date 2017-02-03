const assert = require('assert');
const Test = require('./models/test');

describe('Finding a Mongo record', () => {
    let test;
    beforeEach(done => {
        test = new Test({
            name: 'test',
            age: 1
        })
        test.save().then(() => {
            done();
        }).catch(err => {
            console.error(err);
        })
    })

    it('Find test within Mongo', done => {
        Test.findOne({ name: 'test' }).then(result => {
            assert(result.name === 'test');
            done();
        }).catch(err => {
            console.error(err);
            throw Error;
        })
    })
    it('Find by ID', done => {
        Test.findOne({_id: test._id }).then(result => {
            assert(result._id.toString() === test._id.toString());
            done();
        }).catch(err => {
            console.error(err);
            throw Error;
        })
    })
})