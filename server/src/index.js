const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5000'
}));

app.get('/', (req, res) => {
    res.json({
        message: `Hello worls, my port is ${port}`
    });
});

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        error: error.message,
        stack: process.env.NODE_ENV === 'PRODUCTION' ? '' : error.stack
    });
});

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`Server listening on port: ${port}`);
});