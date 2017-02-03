const assert = require('assert');
const Test = require('./models/test');

describe('Nesting records in Mongo', () => {
    it('Create a test with test2 nested', done => {
        let test = new Test({
            name: 'test', 
            age: 2,
            testTwo: [{
                title: 'test2'
            }]
        })
        test.save().then(() => {
            Test.findOne({name: 'test'}).then(result => {
                assert(result.testTwo.length === 1);
                done();
            }).catch(err => {
                throw Error;
                console.error(err);
            })
        })
    })
    it('Add test 2 to test', done => {
        let test = new Test({
            name: 'test', 
            age: 2,
            testTwo: [{
                title: 'test2'
            }]
        })

        test.save().then(() => {
            Test.findOne({name: 'test'}).then(result => {
                result.testTwo.push({title: 'Book 3'});
                result.save().then(() => {
                    Test.findOne({name: 'test'}).then(result => {
                        assert(result.testTwo.length == 2);
                        done();
                    }).catch(err => {
                        throw Error;
                        console.error(err);
                        done();
                    })
                }).catch(err => {
                    throw Error;
                    console.error(err);
                    done();
                })
            })
        }).catch(err => {
            throw Error;
            console.error(err);
            done();
        })
    })
})