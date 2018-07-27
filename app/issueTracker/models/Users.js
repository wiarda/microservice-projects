import { issueTrackerDb } from '../../../models/connections';
import mongoose from 'mongoose';
import crypto from 'crypto'
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
    {
        username: {type:String, required:true, unique:true}
        ,email: {type:String}
        ,hash: String
        ,salt: String
        ,issues: [ {type: Schema.Types.ObjectId, ref: "Issue"} ]
    }, {timestamps: true}
);

UsersSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString("hex")
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex")
}

UsersSchema.methods.validPassword = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex")
    return this.hash === hash
}

const Users = issueTrackerDb.model("Users", UsersSchema);
export default Users;