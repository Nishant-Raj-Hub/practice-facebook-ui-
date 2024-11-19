require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Create a Mongoose Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a Mongoose Model
const User = mongoose.model('User', userSchema);

// API Route to Handle Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Save the user data to the database
    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'User logged in and saved successfully.' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    res.status(500).json({ message: 'Internal server error.', error });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
