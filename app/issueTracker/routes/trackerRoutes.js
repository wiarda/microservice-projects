import express from 'express'
import { landingPage } from '../controllers/trackerController';
const router = express.Router()

router.get("/",landingPage)


export default router