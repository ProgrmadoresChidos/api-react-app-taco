require('./config/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// routes
const routes = require('./routes');

// 
const app = express();
app.use(express.json());

// Cookie parser
app.use(cookieParser());

const PORT = process.env.PORT;

// cors
app.use(cors({
    origin: process.env.DOMAIN,
    credentials: true
}));

// Require routes
app.use(routes);


// Conexion con Mongo DB
mongoose.connect(process.env.MONGO_CONNEC_TO, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('ONLINE database!');
});

app.listen(PORT, () => console.log('Server has started on port: ', PORT));