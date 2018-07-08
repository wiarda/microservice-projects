import mongoose from 'mongoose'
import {convertToShort} from '../controllers/urlShortenerController'
const Schema = mongoose.Schema

const indexSchema = new Schema(
    {
        name: {type:String, required:true, unique:true}
        ,index: {type:Number, required:true}
    }, {
        toObject: {virtuals: true}
        ,toJSON: {virtuals:true}
    }
)

indexSchema.virtual("short")
.get(function(){
    return convertToShort(this.index)
})

const Index = mongoose.model("Index", indexSchema)
export default Index


// (async function initializeIndex(name){
//     let exists = await Index.find({name})
//     console.log(exists)
//     if (exists.length) return
//     else {
//         console.log("attempting to add first index")
//         let doc = {name, index:300}
//         let index = new Index(doc)
//         index.save(err=>{
//             if (err){
//                 //try again
//                 setTimeout((name)=>initializeIndex(name),1000)
//             }
//         })
//     }
// })("shortener")
