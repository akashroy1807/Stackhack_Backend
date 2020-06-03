const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    buyer: { type: String, required: true },
    eventId: { type: String, required: true },
    ticketcode: { type: String, required: true },
    ticketQR: { type: String, required: true, unique: true, trim: true },
    dateOfBuy: { type: String, required: true },
    price: { type: String, required: true }
},
{
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;