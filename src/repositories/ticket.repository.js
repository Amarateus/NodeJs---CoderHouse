import {
    ticketModel
} from "../dao/models/mongo/ticket.model.js";

export default class TicketRepository {
    // crear un nuevo ticket
    async newTicket(purchase) {
        const newTicket = await ticketModel.create(purchase)
        return newTicket
    }
}