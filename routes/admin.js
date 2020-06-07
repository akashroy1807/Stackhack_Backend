const router = require('express').Router();
let Location = require('../models/location.model');
let User = require('../models/user.model');

router.route('/get_location').get((req,res) => {
    var locationList = [];
    Location.find()
        .then(locations => {
            locations.map((location) => {
                locationList.push({
                    "location": location.location,
                    "locationId": location.locationId
                });
            })
            res.json(locationList);
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/add_location').post((req,res) => {
    const location = req.body.location;

    Location.findOne({location: location})
        .then(locations => {
            if(!locations){
                Location.findOne().sort({createdAt: -1})
                    .then(last => {
                        if(!last) {
                            locationId = 1;
                        } else {
                            locationId = last.locationId + 1;
                        }
                        const newLocation = new Location({locationId, location});
                        newLocation.save()
                            .then(() => res.json({
                                "message" : "Location added"
                            }))
                            .catch(err => res.status(400).json('Error:' + err));
                        })
                    .catch(err => res.status(400).json('Error:' + err));
            }
            else{
                res.status(208).json({
                    "message" : "failure"
                })
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete_location').post((req,res) => {
    Location.deleteOne({locationId: req.body.locationId})
        .then(() => res.json({
            "message": 'Success'
        }))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/make_admin').post((req,res) => {
    const email = req.body.email;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            res.status(204).json({"message" : "Failure"});
        }
        else{
            user.role = "admin";
            user.save()
                .then(() => res.json({"message" : "Success"}))
                .catch(err => res.status(400).json('Error:' + err));
        }
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/remove_admin').post((req,res) => {
    const email = req.body.email;
    User.findOne({email: email})
    .then(user => {
        if(!user){
            res.status(204).json({"message" : "Failure"});
        }
        else{
            user.role = "user";
            user.save()
                .then(() => res.json({"message" : "Success"}))
                .catch(err => res.status(400).json('Error:' + err));
        }
    })
    .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;