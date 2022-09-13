const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

console.log(path.join(__dirname,));
//initialize
const app = express();
require('./database');
require('./passport/local.auth');


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'contraSecreta',
    resave: false,
    saveUninitialized: false
  }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//pongo el mensaje aca para tenerlo en toda la app
app.use((req, res, next) => {
    app.locals.errorDeRegistro = req.flash('errorDeRegistro');
    app.locals.errorDeIngreso = req.flash('errorDeIngreso');
    app.locals.user = req.user;//almaceno el usuario
    next()
});

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'))

//Start server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});

