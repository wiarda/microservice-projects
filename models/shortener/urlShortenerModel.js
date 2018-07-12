import mongoose from 'mongoose'
import { shortenerDb } from '../connections';
const SHORT_PATH = "/short/"
const Schema = mongoose.Schema

const LinkSchema = new Schema(
    {
        url: {type:String, required:true, unique:true}
        ,short: {type:String, required:true, unique:true}   
    }
)

LinkSchema.virtual("link")
.get(function(){
    return SHORT_PATH + this.short
})

const Links = shortenerDb.model("Links", LinkSchema)
export default Links