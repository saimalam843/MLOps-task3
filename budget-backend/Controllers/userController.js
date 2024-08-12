const BTUser = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Endpoint for signup
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, budget } = req.body;

        const existingUser = await BTUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new BTUser({ firstName, lastName, email, password: hashedPassword, budget });
        await newUser.save();

        const data = { user: { id: newUser.id } };
        const token = jwt.sign(data, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Endpoint for login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const BTuser = await BTUser.findOne({ email });

        if (BTuser) {
            const passCheck = await bcrypt.compare(password, BTuser.password);
            if (passCheck) {
                const data = { BTuser: { id: BTuser.id } };
                const token = jwt.sign(data, process.env.JWT_SECRET);
                return res.json({ success: true, token });
            } else {
                return res.status(401).json({ success: false, error: "Wrong password" });
            }
        } else {
            return res.status(404).json({ success: false, error: "User does not exist" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
