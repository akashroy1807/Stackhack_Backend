const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    eventId: { type: Number, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, required: false },
    favourite: {type: Boolean, required: true}
},
{
    timestamps: true
});

registerSchema.index({ eventId: 1, userId: 1}, { unique: true });

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;