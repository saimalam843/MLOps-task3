const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

const userRoutes = require('./Routes/userRoutes');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', userRoutes);

// DB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

// API
app.get("/", (req, res) => {
    res.send("Express app is running");
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Express running on port ${port}`);
    } else {
        console.log(`Error: ${error}`);
    }
});
