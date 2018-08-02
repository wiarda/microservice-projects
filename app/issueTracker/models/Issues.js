import { issueTrackerDb } from '../../../models/connections';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const IssuesSchema = new Schema(
    {
        name: {type:String, required: true}
        ,description: {type:String}
        ,userId: {type:Schema.Types.ObjectId}
        ,status: {type:String, enum:["Open","Complete","Archived"]}
        ,dueDate: {type: Date}
    }, {timestamps: true}
);

const Issues = issueTrackerDb.model("Issues", IssuesSchema);
export default Issues;