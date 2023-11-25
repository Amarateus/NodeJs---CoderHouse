import winston from 'winston'
import dotenv from 'dotenv'
dotenv.config()

const config = {
    PRODUCTION: {
        transports: [
            new winston.transports.Console({
                level: "info"
            }),
            new winston.transports.File({
                level: "error",
                filename: "./errors.log",
                lazy: true
            })
        ]
    },
    DEVELOPMENT: {
        transports: [
            new winston.transports.Console({
                level: "debug"
            })
        ]
    }
}


export const logger = winston.createLogger(config[process.env.ENVIRONMENT])