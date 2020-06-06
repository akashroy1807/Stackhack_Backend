const router = require('express').Router();
let Ticket = require('../models/ticket.model');
let Event = require('../models/events.model');

router.route('/').get((req,res) => {
    Ticket.find()
        .then(tickets => res.json(tickets))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/get_type/:id').get((req,res) => {
    const eventId = req.params.id;
    Ticket.findOne({eventId: eventId}, 'ticketType')
        .then(ticket => res.json(ticket))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add').post((req,res) => {
    const eventId = req.body.eventId;
    const ticketType = req.body.ticketType;
    const discountCode = req.body.discountCode;
    
    Event.findOne({eventId: eventId})
        .then(event => {
            if(event){
                const newTicket = new Ticket({eventId, ticketType, discountCode});
                newTicket.save()
                    .then(() => res.json({
                        "message" : "Success"
                    }))
                    .catch(err => res.status(400).json('Error:' + err));
            }
            else{
                res.json({
                    "message" : "Event ID invalid"
                })
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;