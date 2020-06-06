const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    eventId: { type: Number, required: true },
    ticketType: [{
        name: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    discountCode: [{
        name: { type: String, required: true },
        value: { type: Number, required: true }
    }]
},
{
    timestamps: true
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;