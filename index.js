const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from the project directory

// Example route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Serve the index.html file
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Define your Expense model and routes
const Expense = mongoose.model('Expense', new mongoose.Schema({
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now }
}));

app.post('/api/expense', async (req, res) => {
    const { expense, category } = req.body;

    if (!expense || !category) {
        return res.status(400).send('Expense and Category are required');
    }

    try {
        const newExpense = new Expense({ amount: expense, category: category });
        await newExpense.save();
        res.status(200).json({ message: 'Expense added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Set the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});