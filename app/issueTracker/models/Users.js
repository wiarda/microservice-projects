import { issueTrackerDb } from '../../../models/connections'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UsersSchema = new Schema(
    {
        username: {type:String, required:true, unique:true}
        ,issues: [ {type: Schema.Types.ObjectId, ref: "Issue"} ]
    }, {timestamps}
)

const Users = issueTrackerDb.model("Users", UsersSchema)
export default Users