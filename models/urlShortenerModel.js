import mongoose from 'mongoose'
const SHORT_PATH = "/short/"
const Schema = mongoose.Schema

const LinkSchema = new Schema(
    {
        url: {type:String, required:true}
        ,short: {type:String, required:true}   
    }
)

LinkSchema.virtual("link")
.get(function(){
    return SHORT_PATH + this.short
})

const Links = mongoose.model("Links", LinkSchema)
export default Links