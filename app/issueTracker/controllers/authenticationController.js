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
    res.json(userInfo)

    //add error handling
}


