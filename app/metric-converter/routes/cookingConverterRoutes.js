import express from 'express'
import { converterInstructions, conversionRequest } from '../controllers/converterController';
const router = express.Router()

router.get("/",converterInstructions)
router.get("/request", conversionRequest)

export default router