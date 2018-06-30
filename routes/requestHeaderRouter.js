import express from 'express'
import {instructionsPage, parseRequestHeader} from '../controllers/requestHeaderController'
const router = express.Router()

// parse request header
router.get("/",parseRequestHeader)

// api instructions
router.get("/instructions",instructionsPage)

export default router