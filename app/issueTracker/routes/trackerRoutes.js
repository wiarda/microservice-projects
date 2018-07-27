import express from 'express';
import passport from 'passport';
import session from 'express-session'
import dotenv from "dotenv"
import multer from 'multer'
import cors from 'cors'

import { localStrategy, login, isLoggedIn } from '../controllers/authenticationController';
import { landingPage } from '../controllers/trackerController';
import { signup } from '../controllers/signupController'
import Users from '../models/Users';

const upload = multer()
const router = express.Router();
passport.use(localStrategy);

// load environment variables
dotenv.config()

// cors
router.use(cors({
    credentials: true // cookies
    ,origin: true
    ,methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    ,exposedHeaders: ['Cookie']
}))

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Cookie']
  };

// router.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//     if ('OPTIONS' == req.method) {
//          res.send(200);
//      } else {
//          next();
//      }
//     });


// session and user authentication middleware
router.use(session({ 
    secret: process.env.SESSION_SECRET
    ,proxy:true // to allow requests from frontend dev
    ,resave:false
    ,saveUninitialized:true
    ,cookie: {
        httpOnly: false
        ,secure: false
        ,maxAge:36000000
        ,domain: "http://localhost:8000/"
    }
}));
router.use(passport.initialize());
router.use(passport.session()); 

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
    ,isLoggedIn
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

router.get("/:account"
    ,isLoggedIn
    ,function(req,res){
        console.log(req.params)
        res.json({type:"account",user: req.user})
    }
)

export default router;