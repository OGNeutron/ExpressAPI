const assert = require('assert');
const Test = require('./models/test');

describe('Deleting mongo record', () => {
    let test;
    beforeEach(done => {
        test = new Test({
            name: 'test',
            age: 2,
        })
        test.save().then(() => {
            done();
        })
    })

    it('Deleting a record in Mongo', done => {
        Test.findOneAndRemove({name: 'test'}).then(() => {
            Test.findOne({name: 'test'}).then(result => {
                assert(result === null);
                done();
            })
        })
    })
})