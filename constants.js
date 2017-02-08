module.exports.setupGlobals = () => {
    process.env.MONGO_CONNECTION = 'mongodb://expressapi:expressapi@ds145649.mlab.com:45649/expressapi';
    // process.env.PORT = 8080;
    process.env.SECRET = "NeutronStar";
    process.env.MYSQLHOST = "us-cdbr-iron-east-04.cleardb.net";
    process.env.MYSQLDATABSE = "heroku_ddf5f57e722347d";
    process.env.MYSQLPASSWORD = "259ac16c";
    process.env.MYSQLUSER = "b8b3fa538c3fdb";
    // process.env.MYSQLPORT = 5432
}
