const Expense = require('../Models/expense');
const BTUser = require('../Models/user');

// get all expenses with filtering, sorting, and pagination
exports.getAllExpenses = async (req, res) => {
    try {
        const { date, keyword, sort, page = 1, limit = 10 } = req.query;
        const userId = req.user.id;

        // Filtering
        let filter = { user: userId };
        if (date) {
            const [startDate, endDate] = date.split(',');
            filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (keyword) {
            filter.title = { $regex: keyword, $options: 'i' };
        }

        // Sorting
        let sortOption = {};
        if (sort) {
            const [field, order] = sort.split(',');
            sortOption[field] = order === 'desc' ? -1 : 1;
        }

        // Pagination
        const skip = (page - 1) * limit;

        // get expenses
        const expenses = await Expense.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        const totalExpenses = await Expense.countDocuments(filter);

        res.json({
            success: true,
            data: expenses,
            pagination: {
                total: totalExpenses,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(totalExpenses / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// new expense
exports.createExpense = async (req, res) => {
    try {
        const { title, price, date } = req.body;
        const userId = req.user.id;

        const newExpense = new Expense({
            title,
            price,
            date,
            user: userId
        });

        await newExpense.save();

        // user notified
        await BTUser.findByIdAndUpdate(userId, {
            $push: {
                notifications: {
                    message: `You added a new expense: ${title}`,
                    createdAt: new Date()
                }
            }
        });

        res.status(201).json({ success: true, data: newExpense });
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// update expense
exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, date } = req.body;
        const userId = req.user.id;

        const expense = await Expense.findOneAndUpdate(
            { _id: id, user: userId },
            { title, price, date },
            { new: true, runValidators: true }
        );

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // user notified
        await BTUser.findByIdAndUpdate(userId, {
            $push: {
                notifications: {
                    message: `You updated an expense: ${title}`,
                    createdAt: new Date()
                }
            }
        });

        res.json({ success: true, data: expense });
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const expense = await Expense.findOneAndDelete({ _id: id, user: userId });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // user notified
        await BTUser.findByIdAndUpdate(userId, {
            $push: {
                notifications: {
                    message: `You deleted an expense: ${expense.title}`,
                    createdAt: new Date()
                }
            }
        });

        res.json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
