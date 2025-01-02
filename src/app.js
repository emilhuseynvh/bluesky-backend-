const express = require('express');
const cors = require('cors');
const config = require('./config');
const router = require('./routes');
const path = require('path');
const errorMiddleware = require('./middlewares/error.middleware');
require('./config/database');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const uploadPath = path.join(__dirname, "../uploads");
app.use("/upload", express.static(uploadPath));

app.use(errorMiddleware);

app.listen(config.port, () => {
    console.log(`application is running on http://localhost:${config.port}`);
});