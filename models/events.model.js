const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventId: { type: Number, required: true, unique: true },
    eventName: { type: String, required: true },
    eventSummary: { type: String, required: true },
    eventDescription: { type: String, required: true },
    eventStartDate: {type: Date, required: true},
    eventEndDate: {type: Date, required: true},
    eventParticipants: {type: Number, required: true},
    eventMaxParticipants: {type: Number, required: true},
    eventOwner: { type: String, required: true},
    ticketPrice: {type: Number, required: true},
    eventPic: {type: String},
    status : {type: String, required: true},
    location: {type: String, required: true}
},
{
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;