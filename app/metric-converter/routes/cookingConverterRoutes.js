import express from 'express'
import { converterInstructions } from '../controllers/converterController';
const router = express.Router()

router.get("/",converterInstructions)

export default router