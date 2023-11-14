import mongoose from "mongoose";
import { generateRandomString } from "../../../services/generateRandomString.js";

const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: { // string autogenerado y unico
        type: String,
        unique: true,
        default: await generateRandomString(20)
    },
    purchase_datetime: {
        type: String,
        default: Date()
    },
    amount: {   // monto total de la compra
        type: Number,
        required: true
    },
    purchaser: {  // email del usuario
        type: String,
        required: true
    }
})

const ticketModel = mongoose.model(ticketCollection, ticketSchema)

export {
    ticketModel
}