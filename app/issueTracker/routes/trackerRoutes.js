import express from 'express';
import passport from 'passport';
import session from 'express-session'
import flash from 'flash'
import dotenv from "dotenv"
import multer from 'multer'

import { localStrategy, login, isLoggedIn } from '../controllers/authenticationController';
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
    console.log("serialized!")
    done(null, user.id);
});

passport.deserializeUser(function(username,done){
    console.log("deserialized!")
    Users.findById(id,function(err,user){
        done(err, user);
    });
});



router.get("/",isLoggedIn, landingPage);

router.post("/login"
    ,upload.array()
    // ,passport.authenticate("local", {failureRedirect: "error"})
    ,function(req,res,next){
        passport.authenticate("local", function(err,user,info){
            if (err) return res.json({type:"error", message:JSON.stringify(err)})
            if (info) return res.json({type:"error", message:info.message})
            if (user) {
                req.logIn(user, function(err){
                    if(err) return res.json({type:"error", message:JSON.stringify(err)})
                    next()
                })
            }

        })(req,res,next)
    }
    ,login
);

router.post("/signup", upload.array(), signup)

router.get("/:account",isLoggedIn,function(req,res){
    console.log(req.params)
    res.send(req.user)
})

export default router;