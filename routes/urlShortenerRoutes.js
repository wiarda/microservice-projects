import express from 'express'
import {instructions, shortenUrl} from '../controllers/urlShortenerController'

let router = express.Router()

router.get("/", instructions)
router.post("/", shortenUrl)

export default router