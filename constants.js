module.exports.setupGlobals = () => {
    process.env.MONGO_CONNECTION = 'mongodb://expressapi:expressapi@ds145649.mlab.com:45649/expressapi';
    process.env.PORT = 3000;
    process.env.SECRET = "NeutronStar"
}