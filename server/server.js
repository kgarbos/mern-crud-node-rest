const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Route
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')

// app
const app = express();

// DB
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err));

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(cors());
app.use(morgan('dev'));

// Route Middleware
app.use('/api', postRoutes);
app.use('/api', authRoutes);

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));