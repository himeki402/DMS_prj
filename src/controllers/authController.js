import { User } from "../model/model.js"
import Bcrypt from "bcrypt"
import passport from '../config/passport.js'
import {mongooseToObject} from "../util/mongoose.js"

const authController = {
    registerUser: async (req, res) => {
        try {
            const salt = await Bcrypt.genSalt(10)
            const hashed = await Bcrypt.hash(req.body.password, salt)

            //CREATE new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                fullname: req.body.fullname,
                password: hashed
            })
            //Save to DB
            const user = await newUser.save()

            req.flash('success', 'Đăng ký thành công. Vui lòng đăng nhập.');
            res.redirect("login");
        } catch (error) {
            req.flash('error', 'Đăng ký thất bại. Vui lòng thử lại.');
            res.redirect('register');
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
            // ,{ isAuthenticated: req.isAuthenticated() }
            )
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getLogin: (req, res) => {
        res.render('auth/login', { 
            message: req.flash('error'), 
            isAuthenticated: req.isAuthenticated(),
            })
            console.log(req.isAuthenticated())
    },
}


export default authController