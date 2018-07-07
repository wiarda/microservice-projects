import express from 'express'
import {serveLink} from '../controllers/urlShortenerController'

let router = express.Router()

router.get("/:short", serveLink)

export default router