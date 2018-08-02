import express from 'express';
import passport from 'passport';
import session from 'express-session'
import dotenv from "dotenv"
import multer from 'multer'
import cors from 'cors'
import redis from 'connect-redis'

import { localStrategy, login, isLoggedIn } from '../controllers/authenticationController';
import { landingPage, addTask } from '../controllers/trackerController';
import { signup, isUsernameUnique } from '../controllers/signupController'
import Users from '../models/Users';

// load environment variables
dotenv.config()

const upload = multer()
const router = express.Router();
passport.use(localStrategy);

// redis configuration
const RedisStore = redis(session)
// const client = redis.createClient()
const redisOptions = {
    host: 'localhost'
    ,port: 6379
};

// cors
router.use(cors({
    credentials: true // cookies
    , origin: true
    , methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
    // , exposedHeaders: ['Cookie']
}))

// session and user authentication middleware
router.use(session({
    store: new RedisStore(redisOptions)
    ,secret: process.env.SESSION_SECRET
    , proxy: true // to allow requests from frontend dev
    , resave: false
    , saveUninitialized: true
    , cookie: {
        httpOnly: false
        , secure: false
        , path: "/api/tracker"
        , maxAge: 36000000
        // ,domain: "http://localhost:8000/"
    }
}));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
    console.log("serialized!")
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    console.log("deserialized!")
    Users.findById(id, function (err, user) {
        done(err, user);
    });
});


// *** ROUTES ***

router.get("/checkaccount", isUsernameUnique);

router.get("/*", isLoggedIn, landingPage);

router.post("/login"
    , upload.array()
    , isLoggedIn
    , function (req, res, next) {
        passport.authenticate("local", function (err, user, info) {
            if (err) return res.json({ type: "error", message: JSON.stringify(err) })
            if (info) return res.json({ type: "error", message: info.message })
            if (user) {
                req.logIn(user, function (err) {
                    if (err) return res.json({ type: "error", message: JSON.stringify(err) })
                    next()
                })
            }

        })(req, res, next)
    }
    , login
);

router.post("/signup", upload.array(), signup);


// router.get("/:account"
//     , isLoggedIn
//     , function (req, res) {
//         console.log(req.params)
//         res.json({ type: "account", user: req.user })
//     }
// );

router.post("/addtask",
    upload.array()
    , isLoggedIn
    , addTask

)

export default router;