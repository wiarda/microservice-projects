import mongoose from 'mongoose'
import {convertToShort} from '../../controllers/urlShortenerController'
import { shortenerDb } from '../connections';
const Schema = mongoose.Schema

export const indexSchema = new Schema(
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

const Index = shortenerDb.model("Index", indexSchema)
export default Index

