import express from 'express'
const router = express.Router()
import {instructions, receiveUpload, serveFile} from '../controllers/metadataController'

router.get("/",instructions)
router.post("/upload", receiveUpload)
router.get("/share/:shortlink",serveFile)

export default router