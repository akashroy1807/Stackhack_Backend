const router = require('express').Router();
let Ticket = require('../models/ticket.model');

router.route('/').get((req,res) => {
    Event.find()
        .then(tickets => res.json(tickets))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req,res) => {
    const ticketId = req.body.ticketNumber;
    Event.find({ticketcode: ticketId})
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error:' + err));
});