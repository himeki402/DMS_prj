import { User } from "../model/model.js"
import Bcrypt from "bcrypt"
import passport from '../config/passport.js'


const authController = {
    registerUser: async (req, res) => {
        try {
          let errors = [];
          const regex = /^[a-zA-Z0-9]+$/;
          const { username, email, password, fullname, repassword } = req.body;
      
          // Check required fields
          if (!username || !email || !fullname || !password || !repassword) {
            errors.push({ msg: 'Please fill all the fields' });
          }
          if (!regex.test(username)) {
            errors.push({ msg: 'Username must contain only letters and numbers' });
        } 
          if (username.length > 20) {
            errors.push({ msg: 'Username must be at maximum of 20 characters' });
          }
          if (password != repassword) {
            errors.push({ msg: 'Passwords do not match' });
          }
          if (password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
          }
          if (!/^[a-zA-Z\s]*$/.test(fullname)) {
            errors.push({ msg: 'Fullname contains characters other than letters and whitespace'})
          }
          if (/^\s*$/.test(username)){
            errors.push({ msg: 'Missing credentials'})
          }
          if (errors.length > 0) {
            return res.render('auth/register', { errors, username, email, password, fullname });
          }
          const user = await User.findOne({ username });
          if (user) {
            errors.push({ msg: 'Username already exists' });
            return res.render('auth/register', { errors, username, email, password, fullname });
          }
      
          // Create new user
          const salt = await Bcrypt.genSalt(10);
          const hash = await Bcrypt.hash(password, salt);
          const newUser = new User({ username, email, password: hash, fullname });
          await newUser.save();
      
          req.flash('success_msg', 'You are now registered and can login');
          res.redirect('/auth/login');
        } catch (err) {
          console.log(err);
          res.status(500).send('Server Error');
        }
      },
    loginUser: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
        })(req, res, next);
    },
    logoutUser: (req, res) => {
        try {
            req.logout((err) => {
                if (err) {
                    console.error(err);
                }
                res.redirect('/');
            });
        } catch (error) {
            console.log(error);
        }
    },
    getRegister: async (req, res) => {
        try {
            res.render('auth/register'
            )
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getLogin: (req, res) => {
        res.render('auth/login', {
            message: req.flash('error'),
        })
    },
}


export default authController