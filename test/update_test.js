const assert = require('assert');
const Test = require('./models/test');

describe('Updating test in Mongo', () => {
    let test;

    beforeEach(done => {
        test = new Test({
            name: 'test',
            age: 2
        })
        test.save().then(() =>{
            done();
        }).catch(err => {
            throw Error;
            console.error(err);
            done();
        })
    })
    it('Updating Test in Mongo', done => {
        Test.update({name: 'test'}, {name: 'test1'}).then(() => {
            Test.findOne({age: 2}).then(result => {
                assert(result.name == 'test1');
                done();
            })
        }).catch(err => {
            throw Error;
            console.error(err);
            done();
        })
    })
})