import express from 'express'
const router = express.Router()
import {instructions, receiveUpload} from '../controllers/metadataController'

router.get("/",instructions)
router.post("/upload", receiveUpload)

export default router