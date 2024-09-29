const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Define the Expense model
const Expense = mongoose.model('Expense', new mongoose.Schema({
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now }
}));

// POST route to add an expense
app.post('/api/expense', async (req, res) => {
    const { amount, category } = req.body;

    if (!amount || !category) {
        return res.status(400).send('Amount and Category are required');
    }

    try {
        const newExpense = new Expense({ amount, category });
        await newExpense.save();
        res.status(200).json({ message: 'Expense added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
