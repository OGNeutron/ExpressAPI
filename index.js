const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const validator = require('express-validator');
const exphbs = require('express-handlebars');
const port = 5000;
const flash = require('connect-flash');
const morgan = require('morgan');
const cors = require('cors');

const adminPages = require('./router/admin_pages');
const api = require('./router/api');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/MainAPI', () => {
    console.log('Connected to mongo')
});

const db = mongoose.connection;

const server = http.createServer(app);


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(cors());
app.options('*', cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Manual use of Cors
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })


app.use('/', adminPages);
app.use('/api', api);

server.listen(process.env.PORT || port, () => {
    console.log(`Listening to port ${port}`);
})

