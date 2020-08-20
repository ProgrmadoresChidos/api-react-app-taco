require('./config/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;

// cors
app.use(cors);

// Require routes
app.use(routes);

// Conexion con Mongo DB
mongoose.connect('mongodb://localhost:27017/app-del-taco', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('ONLINE database!');
});

app.listen(PORT, () => console.log('Server has started on port: ', PORT));