const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    budget: { type: Number, required: true },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' }, 
    notifications: [{
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }], 
});

const BTUser = mongoose.model('BTUser', userSchema);
module.exports = BTUser;
