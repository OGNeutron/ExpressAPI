const assert = require('assert');
const Test = require('./models/test');

describe('Inserting records into Mongo', () => {
    it('Inserting a new test into the database',done => {
        let test = new Test({
            name: 'test1',
            age: 1
        })

        test.save().then(() => {
            assert(test.isNew === false);
            done();
        }).catch(err => {
            throw Error;
            console.error(err);
        })
    })

})