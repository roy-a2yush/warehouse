//node modules
const express = require('express')
const dotenv = require('dotenv')
const session = require('express-session')
const mongoDbSession = require('connect-mongodb-session')(session)
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

//files
const connectDB = require('./config/db')
const startSession = require('./config/db')
const indexRoutes = require('./routes/index')

//configurations
dotenv.config({
    path: './config/config.env'
})
const app = express()
app.use(express.json());
app.set('view-engine', 'ejs')
// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
app.use(express.static(__dirname + '/css'));



//connections
connectDB(app)
//sessions
const store = new mongoDbSession({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
})
  app.use(
    session({
        secret: '@34152$3254dgein',
        resave: false,
        saveUninitialised: false,
        store: store
    })
)

//routes
app.use('/', indexRoutes)

//exporting file
module.exports = app