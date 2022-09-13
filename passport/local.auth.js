const passport = require('passport');
const localStrategy = require('passport-local').Strategy

const User = require('../models/user.js')

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(user){
        return done(null, false, req.flash('errorDeRegistro', 'El email ya esta registrado.'));
    }else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        console.log(newUser);
        await newUser.save();
        done(null, newUser);
    }
}));


passport.use('local-signin', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
  }, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
    if(!user) {
      return done(null, false, req.flash('errorDeIngreso', 'El email es incorrecto'));
    }
    if(!user.comparePassword(user, password)) {
      return done(null, false, req.flash('errorDeIngreso', 'La contraseña es incorrecta.'));
    }
    return done(null, user);
}));

