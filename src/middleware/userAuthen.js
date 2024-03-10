import { mongooseToObject } from "../util/mongoose.js";

const addUserInfoMiddleware = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user ? mongooseToObject(req.user) : null;
  next();
};

export default addUserInfoMiddleware;

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/auth/login');
};
export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) { 
    return next(); 
  }
  req.flash('error_msg', 'You are not authorized to access this resource');
  res.redirect('/'); 
};