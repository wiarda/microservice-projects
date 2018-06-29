import express from 'express'
import {timestampController, currentTime} from '../controllers/timestampController'

const router = express.Router()

// Entry page
router.get("/", function(req,res){
    res.send("add instructions here")
})

// Current time
router.get("/current", currentTime)

// Timestamp API
router.get("/:date", timestampController)

export default router