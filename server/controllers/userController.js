    const User = require('../models/User');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

    // Register a new user
    exports.registerUser = async (req, res) => {
        try {
            const { username, email, password } = req.body;
            // Check if user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            user = new User({
                username,
                email,
                password: hashedPassword,
            });

            await user.save();
            
            // Generate JWT
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ message: 'User created successfully', token });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    };

    // Login user
    exports.loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    };
