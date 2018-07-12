// import mongoose from 'mongoose'
import {indexSchema} from '../shortener/indexModel'
import {fileshareDb} from '../connections'

// console.log("IndexModel")
// console.log(fileshareDb)

const Index = fileshareDb.model("Index", indexSchema)
export default Index