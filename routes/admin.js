const router = require('express').Router();
let Location = require('../models/location.model');

router.route('/get_location').get((req,res) => {
    var locationList = [];
    Location.find()
        .then(locations => {
            locations.map((location) => {
                locationList.push(location.location);
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
                res.json({
                    "message" : "Location exists"
                })
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;