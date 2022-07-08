const express = require('express');
const { serializeUser } = require('passport');
const router = express.Router();

const User = require('../models/User')

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
});

router.post('/users/signup', async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
    const errors = [];
    if(name.length <= 0) {
        errors.push({text: 'Se necesita un nombre'});
    }
    if (password != confirm_password) {
      errors.push({text: 'Contraseñas no coinciden'});
    }
    if (password.length < 4) {
      errors.push({text: 'La contraseña debe ser mayor de 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {

     const emailUser = await User.findOne({email: email});
     if (emailUser) {
        req.flash('error_msg', 'Este correo ya esta en uso')
        res.redirect('/users/signup');
     }

     const newUser =  new User({name, email, password});
     newUser.password = await newUser.encryptPassword(password)
     await newUser.save();
     req.flash('success_msg', 'Tu cuenta a sido registrada correctamente');
     res.redirect('/users/signin');
    }
});

router.get('/users/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = router;