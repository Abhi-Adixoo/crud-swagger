const express = require('express');
const mongoose = require('mongoose');
const swagger = require('./swagger'); // Import Swagger configuration

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dummy')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Set up Swagger
app.use('/api-docs', swagger.serve, swagger.setup);

// Middleware
app.use(express.json());

// Routes
const productRouter = require('./routes/products');
app.use('/products', productRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
