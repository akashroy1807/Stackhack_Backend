const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventId: { type: Number, required: true, unique: true },
    eventName: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventDate: {type: Date, required: true},
    eventParticipants: {type: Number, required: true},
    eventOwner: { type: String, required: true},
    ticketPrice: {type: Number, required: true},
    eventPic: {type: String}
},
{
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;