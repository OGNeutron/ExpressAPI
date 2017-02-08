module.exports.setupGlobals = () => {
    process.env.MONGO_CONNECTION = 'mongodb://expressapi:expressapi@ds145649.mlab.com:45649/expressapi';
    process.env.PORT = 4000;
    process.env.SECRET = "NeutronStar";
    process.env.MYSQLHOST = "ec2-54-225-230-243.compute-1.amazonaws.com";
    process.env.MYSQLDATABSE = "d2at5n7ddcqc4o";
    process.env.MYSQLPASSWORD = "20cd06be922c2e1356434831584a3730ccbcd5015f8143aade40bcd79bcb089b";
    process.env.MYSQLUSER = "ywkiibqjxgqnlx";
    process.env.MYSQLPORT = 5432
}
