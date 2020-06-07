const router = require('express').Router();
let Register = require('../models/registration.model');
let Ticket = require('../models/ticket.model');
var otpGenerator = require('otp-generator');

router.route('/').get((req,res) => {
    Register.find()
        .then(register => res.json(register))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/get_price').post((req,res) => {
    const eventId = req.body.eventId;
    const type = req.body.ticketType;
    const discountCode = req.body.discountCode;
    var total = 0;
    var discount = 0;
    var sum = 0;

    Ticket.findOne({eventId: eventId})
        .then(ticket => {
            ticket.ticketType.map((index) => {
                if(index.id == type){
                    total = index.price;
                }
            })
            ticket.discountCode.map((index) => {
                if(index.name == discountCode){
                    discount = index.value;
                }
            })
            sum = total - ((discount*total)/100);
            res.json({"price": sum});
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/purchase').post((req,res) => {
    const eventId = req.body.eventId;
    const email = req.body.email;
    const ticketType = req.body.ticketType;
    const discountCode = req.body.discountCode;
    const price = req.body.price;
    var ticketCode = "E";

    // var same = true;
    const ticketId = otpGenerator.generate(6, { alphabets: false, specialChars: false, upperCase: false });
    Register.findOne({ticketId: ticketId})
        .then(ticketId => {
            if(!ticketId){

            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;