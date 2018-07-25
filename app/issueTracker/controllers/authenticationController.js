import LocalStrategy from 'passport-local'
import Users from '../models/Users'

export const localStrategy = new LocalStrategy(authenticateUser)

function authenticateUser(username, password, done){
    User.findOne({username}, (err,user)=>{
        if (err) done(err);
        if (!user) done(null,false, {message: "Incorrect username"})
        if (!user.validPassword(password)) done(null,false,{message:"Incorrect password"})
        else done(null,user)
    })
}

/**
 * Send client user data + task list 
 * @param {*} req 
 * @param {*} res 
 */
export function login(req,res){
    let userInfo = {
        type:"login"
        ,user: req.user
        ,tasks:"tasks to add to redux"
    }

    res.json(userInfo)

    //add error handling
}


