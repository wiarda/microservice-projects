import LocalStrategy from 'passport-local'
import Users from '../models/Users'

export const localStrategy = new LocalStrategy(authenticateUser)


function authenticateUser(username, password, done){
    console.log("authenticateUser",username,password)
    Users.findOne({username}, (err,user)=>{
        if (err) {
            console.log(err)
            return done(err);
        }
        if (!user){
            return done(null,false, {message: "Incorrect username"});
        } 
        if (!user.validPassword(password)) {
            return done(null,false,{message:"Incorrect password"});
        }
        else return done(null,user);
    })
}

/**
 * Send client user data + task list 
 * @param {*} req 
 * @param {*} res 
 */
export function login(req,res){
    console.log("authenticating")
    // console.log(res.locals.user)
    console.log(req.user)
    console.log(req.session)
    let userInfo = {
        type:"login"
        ,user: req.user
        ,tasks:"tasks to add to redux"
    }
    // res.json(userInfo)
    req.session.save(()=>{
        console.log("session saved", req.session)
        res.json({type:"loggedin",redirect: req.user.username})
    })
    //add error handling
}


export function isLoggedIn(req,res,next){
    console.log("Checking authentication status")
    console.log("user", req.user)
    console.log("session", req.session)
    console.log("cookie", req.cookie)
    next()
}