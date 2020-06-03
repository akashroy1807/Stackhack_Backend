const router = require('express').Router();
let Register = require('../models/registration.model');

router.route('/').get((req,res) => {
    Register.find()
        .then(register => res.json(register))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;