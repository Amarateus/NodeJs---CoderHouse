import EErrors from "../services/errors/enumsErrors.js";
import { logger } from "../services/logger.js"

export default (error, req, res, next) => {
    logger.error(error.cause)
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status: "Error", error: error.name})
            break
        default:
            res.send({status:"Error", error: "Error no manejado"})
    }
}