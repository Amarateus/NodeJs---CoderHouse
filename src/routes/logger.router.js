import {
    Router
} from 'express'
import { logger } from '../services/logger.js'

const router = Router()

router.get('/', (req, res) => {
    logger.error("Logger error")
    logger.warn("Logger warn")
    logger.info("Logger info")
    logger.http("Logger http")
    logger.verbose("Logger verbose")
    logger.debug("Logger debug")
    logger.silly("Logger silly")
    res.send("Todos los loggers probados")
})

export default router