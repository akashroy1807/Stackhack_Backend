const router = require('express').Router();
const sha256 = require('sha256');
let User = require('../models/user.model');

router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/login').post((req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const time = new Date();
    // console.log(sha256(time.toString()));
    User.find({email: email, password: password})
        .then(users => {
            if(!users.length){
                res.json({"message":'Failure'});
            }
            else{
                users[0].sessionToken = sha256(email + time.toString());
                users[0].save()
                    .then(() => 
                    res.json(
                        {
                            "message":'Success',
                            "token": sha256(email + time.toString())
                        }
                        )
                    )
                    .catch(err => res.status(400).json('Error:' + err));
                
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/get_session').post((req,res) => {
    const token = req.body.token;
    User.find({ sessionToken: token })
        .then(user => {
            console.log(user);
            if(user.length === 0){
                res.json({'message': 'Failed'});
            }
            else{
                user[0].lastLoggedIn = new Date()
                user[0].save()
                    .then(() => {
                        res.json(
                            {
                                "username": user[0].username,
                                "profilepic": user[0].profilepic,
                                "lastLoggedIn": user[0].lastLoggedIn
                            })
                    })
                    .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/check_session').post((req,res) => {
    const token = req.body.token;
    User.find({ sessionToken: token })
        .then(user => {
            console.log(user);
            if(user.length === 0){
                res.json({'message': 'Failed'});
            }
            else{
                res.json({"message": "Success"});
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/register').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const email = req.body.email;
    const profilepic = req.body.pic;
    const sessionToken = 'NULL';
    const lastLoggedIn = new Date();
    const newUser = new User({ username, password, role, email, profilepic, sessionToken, lastLoggedIn });

    User.find({email: email})
        .then(users => {
            if(users.length){
                res.json('Username Already Exists');
            }
            else{
                console.log(newUser);
                newUser.save()
                    .then(() => res.json('User Saved in Database'))
                    .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/delete').post((req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const id = req.body.id;
    
    User.find({email: email, password: password})
        .then(users => {
            if(!users.length){
                res.json('No Such User Exists');
            }
            else{
                User.findByIdAndDelete(req.body.id)
                .then(() => res.json('Account deleted'))
                .catch(err => res.status(400).json('Error:' + err));
            }
        })
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/change_username').post((req,res) => {
    User.findById(req.body.id)
    .then(user => {
        user.username = req.body.username;
        user.save()
            .then(() => res.json('Username updated'))
            .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});

router.route('/change_password').post((req,res) => {
    User.findById(req.body.id)
    .then(user => {
        user.password = req.body.password;
        user.save()
            .then(() => res.json('Password updated'))
            .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));
});


module.exports = router;