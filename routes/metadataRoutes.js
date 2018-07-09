import express from 'express'
const router = express.Router()
import {instructions} from '../controllers/metadataController'

router.get("/",instructions)

export default router