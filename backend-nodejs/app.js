// app.js
require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const sequelize = require('./models');
const router = require('./routes/auth');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve Swagger API Documentation from the static swagger.json
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    // Test database connection before starting the server
    try {
        await sequelize.authenticate();
        console.log('Server is running and SQLite is connected');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }

    console.log(`Server is running on port ${PORT}`);
});
