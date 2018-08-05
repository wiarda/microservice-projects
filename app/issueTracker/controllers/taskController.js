import Issues from '../models/Issues'
import Users from '../models/Users'
export function changeTaskStatus(req,res){
    Issues.update(
        {_id: req.body.id}
        ,{ $set: {status: req.body.status}}
        , {safe:true}
        , function(err,rawResponse){
            if (err) res.json({type:"change status failure"})
            else {
                res.json({type:"change status success", rawResponse})
            }
        }
    )
}

export async function addTask(req, res) {
    let { task } = req.body;
    let userId = req.user._id;

    // add task to db
    let newTask = new Issues({
        name: task
        , status: "Open"
        , userId
    });
    newTask.save(errHandler);
    let taskId = newTask._id


    // link task in user db
    Users.update(
        { _id: userId }
        , { $push: { issues: taskId } }
        , { safe: true }
        , function (err, rawResponse) {
            if (err) console.log("error:", err)
            if (rawResponse) { // success
                res.json({type:"addTaskSuccess", newTask})
            }
        }
    )

}


function errHandler(err) {
    if (err) return console.log(err);
}