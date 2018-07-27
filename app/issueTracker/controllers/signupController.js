import Users from '../models/Users';

export function signup(req,res){
    console.log(req.user)
    let {username, password, email} = req.body;
    console.log("signup request", req.body)

    let user = new Users({
        username
    });

    user.setPassword(password);

    let newAccount = user.save(function(err,user){
        if (err) {
            let message = handleMongoErr(err);
            console.log("signup error", err.message)
            res.json({type: "signupErr", message})
        }
        else {
            console.log("account creation successful");
            res.json({type:"signupSuccess", message:"You've signed up!"})
        }
    })    
};

function handleMongoErr(err){
    switch (err.code){
        case "11000":
            return "This account name is already taken, please choose another."
        
        default:
            return "There was an error signing up, please try again."
    }
}