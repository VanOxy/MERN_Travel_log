const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require("./middlewares").default;

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

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`Server listening on port: ${port}`);
});