import express from 'express'
import {timestampController, currentTime, timestampInstructions} from '../controllers/timestampController'

const router = express.Router()

// Entry page
router.get("/", timestampInstructions)

// Current time
router.get("/current", currentTime)

// Timestamp API
router.get("/:date", timestampController)

export default router