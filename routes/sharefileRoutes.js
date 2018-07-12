import express from 'express'
import { serveFile } from '../controllers/metadataController';
const router = express.Router()

router.get("/:shortlink",serveFile)

export default router