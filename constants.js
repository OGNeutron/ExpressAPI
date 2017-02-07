module.exports.setupGlobals = () => {
    process.env.MONGO_CONNECTION = 'mongodb://localhost/MainAPI';
    process.env.PORT = 4000;
    process.env.SECRET = "NeutronStar"
}