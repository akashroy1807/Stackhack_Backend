const router = require('express').Router();
let Register = require('../models/registration.model');

router.route('/').get((req,res) => {
    Register.find()
        .then(register => res.json(register))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update_rating').post((req,res) => {
    const rating = req.body.rating;
    const email = req.body.email;
    const eventid = req.body.eventid;

    Register.findOne({userId: email, eventId: eventid})
        .then(register => {
            register.rating = rating;
            register.save()
                .then(() => res.json('Details updated'))
                .catch(err => res.status(400).json('Error:' + err));
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;