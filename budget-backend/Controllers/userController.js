const BTUser = require('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// signup
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

//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const BTuser = await BTUser.findOne({ email });

        if (BTuser) {
            const passCheck = await bcrypt.compare(password, BTuser.password);
            if (passCheck) {
                // Use 'user' as the key, consistent with the signup controller
                const data = { user: { id: BTuser.id } };
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




// get user profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Ensure this value is correct
        const user = await BTUser.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error); // Log the error for debugging
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};


// update user profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, budget } = req.body;
        const updatedUser = await BTUser.findByIdAndUpdate(
            userId,
            { firstName, lastName, budget },
            { new: true, runValidators: true }
        ).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// get all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await BTUser.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error); // Logging to find error
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};


// update user information (Admin only)
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, budget, role } = req.body;

        const updatedUser = await BTUser.findByIdAndUpdate(
            id,
            { firstName, lastName, budget, role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};