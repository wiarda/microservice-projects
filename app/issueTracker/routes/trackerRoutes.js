import express from 'express';
import passport from 'passport';
import session from 'express-session'
import flash from 'flash'
import dotenv from "dotenv"
import multer from 'multer'

import { localStrategy, login } from '../controllers/authenticationController';
import { landingPage } from '../controllers/trackerController';
import { signup } from '../controllers/signupController'
import Users from '../models/Users';

// load environment variables
dotenv.config()

const upload = multer()

const router = express.Router();
passport.use(localStrategy);

// session and user authentication middleware
router.use(session({ secret: process.env.SESSION_SECRET}));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash())

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(username,done){
    Users.findById(id,function(err,user){
        done(err, user);
    });
});



router.get("/",landingPage);

router.post("/login"
    ,passport.authenticate("local")
    ,login
);

router.post("/signup", upload.array(), signup)

export default router;