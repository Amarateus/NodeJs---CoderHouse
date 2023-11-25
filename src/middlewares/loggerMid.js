import {
    logger
} from "../services/logger.js";

export const loggerMid = async (req, res, next) => {
    logger.info("Nivel info")
    try {
        await next()
    } catch (err) {
        logger.error(err)
    }
}