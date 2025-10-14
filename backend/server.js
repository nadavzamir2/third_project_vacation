const express = require('express');
const app = express();
const config = require('./config/config');

app.use(express.json());

// Placeholder for routes
app.use('/api', require('./routes/placeholder'));

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
