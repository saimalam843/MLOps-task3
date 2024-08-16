const express = require('express');
const router = express.Router();
const expenseController = require('../Controllers/expenseController');
const auth = require('../Middleware/auth');

// Routes
router.get('/expenses', auth, expenseController.getAllExpenses);
router.post('/expenses', auth, expenseController.createExpense);
router.put('/expenses/:id', auth, expenseController.updateExpense);
router.delete('/expenses/:id', auth, expenseController.deleteExpense);

router.get('/expenses/monthly', auth, expenseController.getMonthlyExpenses);

module.exports = router;
