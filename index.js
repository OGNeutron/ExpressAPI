const constants = require('./constants');
constants.setupGlobals();
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const validator = require('express-validator');
const exphbs = require('express-handlebars');
const port = process.env.PORT || 5000;
const flash = require('connect-flash');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const adminPages = require('./router/admin_pages');
const api = require('./router/api/authentication');
const vue = require('./router/api/VueAPI/VueAPI');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_CONNECTION, () => {
    console.log('Connected to mongo')
});

const db = mongoose.connection;

const server = http.createServer(app);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(cors());
app.options('*', cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Manual use of Cors
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

app.get('/mps', (req, res) => res.status(200).render('game/2dMultiShooter/index'));
app.get('/minesweeper', (req, res) => res.status(200).render('game/minesweeper/index'));
app.use('/', adminPages);
app.use('/api/', api);
app.use('/vue', vue); 

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
})



