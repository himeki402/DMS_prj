import express from 'express';
import { engine } from 'express-handlebars';
import cors from "cors"
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import flash from 'connect-flash';
import dateFormat from 'handlebars-dateformat';
import handlebars from 'handlebars';

import addUserInfoMiddleware,{ensureAuthenticated, isAdmin} from './middleware/userAuthen.js'
import siteRoute from "./routes/site.js"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import connectDB from './config/connectDB.js';
import passport from './config/passport.js'
import session, { MemoryStore } from 'express-session';
import methodOverride from 'method-override';
import documentRoute from "./routes/document.js"
import searchRoute  from "./routes/search.js"
import categoryRoute from "./routes/category.js"

dotenv.config();


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(methodOverride('_method'))

//Connect to DB
connectDB()

//Middleware setup
const store = session.MemoryStore()

app.use(session({
  saveUninitialized: false,
  secret: process.env.KEY_SESSION,
  resave: false,
  cookie:{
    maxAge:1000 *60 *20
  },
  store

}))
app.use(passport.initialize());
app.use(passport.session())
app.use(addUserInfoMiddleware)
// Set up middleware, handlebars engine, and static files
handlebars.registerHelper('dateFormat', dateFormat);
app.use("/",express.static('src/public'));
app.engine('.hbs', engine({
  extname:'.hbs',
  helpers: {
    sum : (a,b) => a + b,
    range: (a,b) => {
      const result = [];
      for (let i = a; i <= b; i++) {
          result.push(i);
      }
      return result;
  },
  eq: function(a, b, options) {
    if (a === b) {
      return options.fn(this);
    } else {
      return options.inverse ? options.inverse(this) : '';
    }
  },
  },
}));
app.set('view engine', '.hbs');
app.set('views', './src/views');
app.use(cors());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use(morgan("common"));

//ROUTES
app.use("/", siteRoute)
app.use("/auth", authRoute)
app.use("/user",ensureAuthenticated, userRoute)
app.use("/documents",ensureAuthenticated,documentRoute)
app.use("/search", searchRoute)
app.use("/category",ensureAuthenticated, categoryRoute)


// Start the server
const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});