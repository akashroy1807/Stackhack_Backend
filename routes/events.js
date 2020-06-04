const router = require('express').Router();
let Event = require('../models/events.model');

router.route('/').get((req,res) => {
    Event.find({status: "active"},'eventId eventName eventSummary ticketPrice eventPic eventStartDate eventEndDate')
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req,res) => {
    Event.findOne({eventId: req.params.id})
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const eventName = req.body.eventName;
    const eventSummary = req.body.eventSummary;
    const eventDescription = req.body.eventDescription;
    const eventStartDate = Date.parse(req.body.eventStartDate);
    const eventEndDate = Date.parse(req.body.eventEndDate);
    const eventParticipants = 0;
    const eventMaxParticipants = req.body.eventMaxParticipants;
    const eventOwner = req.body.eventOwner;
    const ticketPrice = req.body.ticketPrice;
    const eventPic = req.body.eventPic;
    const status = "active";
    eventId = 0;
    Event.findOne().sort({createdAt: -1})
        .then(last => {
            if(!last) {
                eventId = 1;
            } else {
                eventId = last.eventId + 1;
            }
            const newEvent = new Event({eventId, eventName, eventSummary, eventDescription, eventStartDate, eventEndDate, eventParticipants, eventMaxParticipants, eventOwner, ticketPrice, eventPic, status});
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
        event.eventSummary = req.body.eventSummary;
        event.eventDescription = req.body.eventDescription;
        event.eventStartDate = Date.parse(req.body.eventStartDate);
        event.eventEndDate = Date.parse(req.body.eventEndDate);
        event.eventMaxParticipants = req.body.eventMaxParticipants;
        event.eventOwner = req.body.eventOwner;
        event.ticketPrice = req.body.ticketPrice;
        event.eventPic = req.body.eventPic;
        event.status = req.body.status;
        event.save()
            .then(() => res.json('Event updated'))
            .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete').post((req,res) => {
    Event.findOne({eventId: req.body.id})
    .then(event => {
        event.status = "disabled";
        event.save()
            .then(() => res.json('Event deleted'))
            .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});


module.exports = router;