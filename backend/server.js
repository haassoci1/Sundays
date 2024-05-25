const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Use CORS
app.use(cors({
  origin: 'https://turbo-carnival-gwrrggp7grj3p7p4-3000.app.github.dev', // replace with your actual frontend origin
  credentials: true // add this line to handle credentials
}));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
