const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

const PORT = 3000;
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with a strong, random key in a real app

// In-memory "database" to store user data.
// In a real-world application, you would use a database like MongoDB or PostgreSQL.
const users = [];

// Middlewares
app.use(cors()); // Allow cross-origin requests from the HTML file
app.use(express.json()); // Enable JSON body parsing

// Middleware to verify the JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.user = user; // Attach the user payload to the request
        next();
    });
};

// Middleware for role-based access control
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied: Insufficient privileges.' });
        }
        next();
    };
};

// Registration route
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists.' });
        }

        // Hash the password with a salt round of 10
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword,
            role: 'member' // Assign a default role
        };
        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create a JWT with user data and sign it
        const payload = { username: user.username, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful!', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Protected route that requires a valid JWT
app.get('/protected', authenticateToken, (req, res) => {
    res.json({
        message: `Welcome, ${req.user.username}! You have access to this protected data.`,
        user: req.user
    });
});

// Admin-only protected route
app.get('/admin', authenticateToken, checkRole('admin'), (req, res) => {
    res.json({ message: 'Welcome, Admin! This is the admin-only route.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
