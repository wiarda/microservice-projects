import express from 'express'
import {instructions, addUrl} from '../controllers/urlShortenerController'

let router = express.Router()

router.get("/", instructions)
router.post("/", addUrl)

export default router