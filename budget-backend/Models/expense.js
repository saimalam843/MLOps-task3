const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 30 },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'BTUser', required: true },
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
