const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const basicAuth = require('express-basic-auth');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;
const startTime = new Date();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(basicAuth({
    users: { 'admin': 'mindwebs' }
}))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then()
    .catch(err => console.log('Error:' + err));
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
})

const usersRouter = require('./routes/user');
const eventRouter = require('./routes/events');
const registerRouter = require('./routes/registration');
const ticketRouter = require('./routes/ticket');
const adminRouter = require('./routes/admin');

app.use('/user',usersRouter);
app.use('/events',eventRouter);
app.use('/register',registerRouter);
app.use('/ticket',ticketRouter);
app.use('/admin',adminRouter);

app.route('/').get((req,res) => {
    res.json("Server started successfully on " + startTime);
})

app.listen(port, () => {
    console.log('Server is running on port:', port);
})