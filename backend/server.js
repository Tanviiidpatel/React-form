// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const registrationSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    semester: String,
    stream: String,
    futureGoal: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

// API Endpoint
app.post('/api/register', async (req, res) => {
    const { email, phone } = req.body;

    // Check if email or phone already exists
    const existingUser = await Registration.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
        return res.status(400).json({ message: 'Email or Phone number already exists.' });
    }

    const registration = new Registration(req.body);
    try {
        await registration.save();
        res.status(201).send('Registration successful');
    } catch (error) {
        res.status(400).send('Error registering');
    }
});

// Endpoint to fetch all registrations
app.get('/api/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json(registrations);
    } catch (error) {
        res.status(500).send('Error fetching registrations');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});