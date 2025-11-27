const express = require('express');
const path = require('path');
const app = express();

const PORT = 3001;
const staticPath = path.join(__dirname, 'dist');

app.use(express.static(staticPath));
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
