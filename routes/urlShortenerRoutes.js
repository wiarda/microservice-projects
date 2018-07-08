import express from 'express'
import {instructions, addUrl, showNext} from '../controllers/urlShortenerController'

let router = express.Router()

router.get("/", instructions)
router.post("/", addUrl)
router.get("/next", showNext)

export default router