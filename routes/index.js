const router = require('express').Router(); 
const passport = require('passport');


router.get('/', (req,res,next)=>{
    res.render('index');
});

router.get('/signup', (req,res,next) =>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/clima',
    failureRedirect: '/signup',
    pastReqToCallBack: true 
}));

router.get('/signin', (req,res,next) =>{
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/clima',
    failureRedirect: '/signin',
    pastReqToCallBack: true 
}));

router.get('/clima', isAuthenticated, (req,res,next) =>{
    res.render('clima');
});

router.get("/logout", (req, res, next) => {
    req.logout(req.user, err => {
      if(err) return next(err);
      res.redirect("/");
    });
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;