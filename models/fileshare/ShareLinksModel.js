import mongoose from 'mongoose'
import { fileshareDb } from '../connections';
// import {fileshareDB} from './IndexModel'
const EXPIRY_TIME = 10000
const Schema = mongoose.Schema

// console.log(fileshareDB)

const ShareLinksSchema = new Schema(
    {
        filename: {type:String, required:true}
        ,link: {type:String, required:true, unique:true}
        ,timestamp: {type:Number, required: true}
        ,shortlink: {type:String, required:true, unique:true}
        ,metadata: {
            size: Number
            ,filetype: String
        }
    }, {
        toObject: {virtuals: true}
        ,toJSON: {virtuals:true}
    }
)

// determines whether to purge document
ShareLinksSchema.virtual("expired").get(function(){
    return Date.now()-this.timestamp > EXPIRY_TIME
})

const ShareLinks = fileshareDb.model("ShareLinks", ShareLinksSchema)
export default ShareLinks

