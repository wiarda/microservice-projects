import express from 'express'
import {instructionsPage} from '../controllers/requestHeaderController'

const router = express.Router()


// api instructions

router.get("/instructions",instructionsPage)



export default router