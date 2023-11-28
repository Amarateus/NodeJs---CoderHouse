import {
    logger
} from "../services/logger.js";

export const loggerMid = async (req, res, next) => {
    logger.info("Nivel info: Logger Middleware")
    try {
        await next()
    } catch (err) {
        logger.error(err)
    }
}