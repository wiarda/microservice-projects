import mongoose from 'mongoose'
import dotenv from 'dotenv'

const defaultOptions = {
    reconnectTries: Number.MAX_VALUE 
    ,reconnectInterval:1000
  }
dotenv.config()

export const shortenerDb = mongoose.createConnection(process.env.DB_SHORTENER, defaultOptions)
registerDb(shortenerDb,"Shortener database")

export const fileshareDb = mongoose.createConnection(process.env.DB_METADATA, defaultOptions)
registerDb(fileshareDb,"Fileshare database")

export const issueTrackerDb = mongoose.createConnection(process.env.DB_ISSUETRACKER, defaultOptions)
registerDb(issueTrackerDb, "Issue Tracker database")

function registerDb(db, name="db"){
    db.on("error", console.error.bind(console, "MongoDB connection error:"))
    db.once("open",()=>console.log(`${name} connected`))
}