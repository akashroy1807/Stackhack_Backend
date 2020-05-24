const router = require('express').Router();
let Event = require('../models/events.model');

router.route('/').get((req,res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req,res) => {
    Event.findById(req.params.id)
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const eventName = req.body.eventName;
    const eventDescription = req.body.eventDescription;
    const eventDate = Date.parse(req.body.eventDate);
    const eventParticipants = req.body.eventParticipants;
    const eventOwner = req.body.eventOwner;
    const ticketPrice = req.body.ticketPrice;
    const eventPic = req.body.eventPic;
    eventId = 0;
    Event.findOne().sort({createdAt: -1})
        .then(last => {
            if(!last) {
                eventId = 1;
            } else {
                eventId = last.eventId + 1;
            }
            const newEvent = new Event({eventId, eventName, eventDescription, eventDate, eventParticipants, eventOwner, ticketPrice, eventPic});
            newEvent.save()
                .then(() => res.json('Event Saved in Database'))
                .catch(err => res.status(400).json('Error:' + err));          
        })
        .catch(err => res.status(400).json('Error:' + err));

});

router.route('/edit').post((req,res) => {
    Event.findById(req.body.id)
    .then(event => {
        event.eventName = req.body.eventName;
        event.eventDescription = req.body.eventDescription;
        event.eventDate = Date.parse(req.body.eventDate);
        event.eventParticipants = req.body.eventParticipants;
        event.eventOwner = req.body.eventOwner;
        event.ticketPrice = req.body.ticketPrice;
        event.eventPic = req.body.eventPic;
        event.save()
            .then(() => res.json('Event updated'))
            .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete').post((req,res) => {
    Event.findByIdAndDelete(req.body.id)
    .then(() => res.json('Event deleted'))
    .catch(err => res.status(400).json('Error:' + err));
});


module.exports = router;