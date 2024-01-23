import { mongooseToObject } from "../util/mongoose.js";

const addUserInfoMiddleware = (req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user ? mongooseToObject(req.user) : null;
  next();
};

export default addUserInfoMiddleware;